import React from 'react';
import { data as kyrgyzHomePageData } from '#data/kyrgyz/homePage/index.json';
import { render } from '../../components/react-testing-library-with-providers';
import HomePage from './HomePage';

describe('Home Page', () => {
  it('should render a section for each curation', () => {
    const { container } = render(<HomePage pageData={kyrgyzHomePageData} />);
    expect(container).not.toBeEmptyDOMElement();
    expect(container.getElementsByTagName('section').length).toEqual(
      kyrgyzHomePageData.curations.length,
    );
  });
});
