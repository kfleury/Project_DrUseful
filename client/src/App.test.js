import React from 'react';
import { render } from '@testing-library/react';
import Home from './App';
import Drugs from './Drugs';

test('renders learn react link', () => {
  const { getByText } = render(<Home />);
});

Drugs('try', () => {
  const { getByText } = render(<Drugs />);
});
