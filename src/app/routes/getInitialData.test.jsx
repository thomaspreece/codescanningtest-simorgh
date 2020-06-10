import routes from './index';

const MOCK_PATH = 'mock-path';

routes
  .filter(route => route.pageType !== 'error')
  .forEach(({ getInitialData, pageType }) => {
    it(`${pageType} - should handle Ares endpoint not found`, async () => {
      global.fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

      const actual = await getInitialData(MOCK_PATH);
      const expected = {
        error: 'data_response_404',
        status: 404,
      };

      expect(actual).toEqual(expected);
    });

    it(`${pageType} - should handle Ares 500 error`, async () => {
      global.fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

      const actual = await getInitialData(MOCK_PATH);

      expect(actual.status).toEqual(502);
      expect(actual.error).toMatch('Error: Unexpected upstream response');
    });

    it(`${pageType} - should handle Ares returning unexpected data`, async () => {
      global.fetch.mockResponseOnce(
        JSON.stringify({
          dataIsNotAsExpected: 'dataIsNotAsExpected',
        }),
      );

      const actual = await getInitialData(MOCK_PATH);

      expect(actual.status).toEqual(502);
      expect(actual.error.toString()).toMatch(
        'Error: Unexpected data format in response when requesting',
      );
    });
  });
