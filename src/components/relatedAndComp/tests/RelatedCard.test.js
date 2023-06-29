/**
 * @jest-environment jsdom
 */
const {API_URL, API_KEY} = process.env;

import React from 'react';
import RelatedCard from '../RelatedCard';
import renderer from 'react-test-renderer';

describe('RelatedCard Component', () => {

  test('renders something that isn\'t null', () => {
    expect(RelatedCard).not.toBe(null);
  });

  // test('RelatedCard renders correctly', () => {
  //   const tree = renderer
  //     .create(<RelatedCard />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});


