import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('User can focus on the input field', () => {
  const inputElement = screen.getByRole('textbox');

  userEvent.click(inputElement);

  expect(inputElement).toHaveFocus();
});

test('Dropdown is hidden on initial render', () => {
  const dropdownElementOrNull = screen.queryByRole('list');

  expect(dropdownElementOrNull).not.toBeInTheDocument();
});

test('When user clicks into the input field, he/she sees the full list of managers.', async () => {
  const inputElement = screen.getByRole('textbox', { name: 'Manager search' });

  userEvent.click(inputElement);

  const list = await screen.findByRole('list');

  expect(list).toBeInTheDocument();

  const { getAllByRole } = within(list);
  const items = getAllByRole('listitem');

  expect(items.length).toBeGreaterThan(1);
});
