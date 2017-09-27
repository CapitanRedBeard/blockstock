import 'react-native';
import React from 'react';
import BaseText from '../BaseText';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<BaseText>Snapshot test!</BaseText>).toJSON();

  expect(tree).toMatchSnapshot();
});
