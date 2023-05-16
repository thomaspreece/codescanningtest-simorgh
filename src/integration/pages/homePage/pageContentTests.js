export default () => {
  describe('Page content', () => {
    const firstItemHeadline = document.querySelector(
      '[data-testid="topic-promos"] > li  h3 a',
    );

    it('First item in the first curation is the correct headline', () => {
      expect(firstItemHeadline).toBeInTheDocument();
      expect(firstItemHeadline.textContent).toMatchSnapshot();
    });
  });
};