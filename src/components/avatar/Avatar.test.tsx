import { cleanup, render, screen, within } from '@testing-library/react';
import Avatar from './Avatar';

beforeEach(() => {
  render(
    <Avatar
      initials="AB"
      altText="Alice Bob avatar image"
      rgbColorArray={[100, 200, 50]}
    />
  );
});

afterEach(() => {
  cleanup();
});

test('renders Avatar', () => {
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('renders initials', () => {
  expect(screen.getByRole('img')).toHaveTextContent('AB');
});
