import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import WithError from './withError';

describe('withError HOC', () => {
  const Component = () => <h1>Hola</h1>;
  const ErrorHOC = WithError(Component);

  describe('with error', () => {
    shouldShallowMatchSnapshot(
      `should return the errorMain component`,
      <ErrorHOC error="error handling at its best" />,
    );
  });

  describe('with no error', () => {
    shouldShallowMatchSnapshot(
      `should return the passed in component`,
      <ErrorHOC />,
    );
  });
});
