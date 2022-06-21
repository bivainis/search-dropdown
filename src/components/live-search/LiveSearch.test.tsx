import { cleanup, render, screen } from '@testing-library/react';
import LiveSearch from './LiveSearch';

beforeEach(() => {
  render(<LiveSearch id="manager-search" />);
});

afterEach(() => {
  cleanup();
});

test('Renders select component without errors.', () => {
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
