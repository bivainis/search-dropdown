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

test('filter dropdown based on a query', async () => {
  const inputElement = screen.getByRole('textbox', { name: 'Manager search' });

  // focus and type in the query
  const searchQueries = ['Harr', 'harr', 'arr'];

  const scenarios = {
    firstName: {
      searchQueries: ['Harr', 'harr', 'arr'],
      expectedLength: 2,
      expectedText: 'Harriet',
    },
    lastName: {
      searchQueries: ['Banks', 'ban', 'anks'],
      expectedLength: 1,
      expectedText: 'Harriet Banks',
    },
    combined: {
      searchQueries: ['etmc', 'etMc', 'ETmc'],
      expectedLength: 1,
      expectedText: 'Harriet McKinney',
    },
  };

  for (const scenario in scenarios) {
    const { searchQueries, expectedLength, expectedText } =
      scenarios[scenario as keyof typeof scenarios];

    for (const searchQuery of searchQueries) {
      userEvent.click(inputElement);
      userEvent.type(inputElement, searchQuery);

      const list = await screen.findByRole('list');
      const { findAllByTestId } = within(list);
      const filtered = await findAllByTestId('full-name');

      // expect that for this particular query, 2 items should be rendered
      expect(filtered.length).toBe(expectedLength);

      // make sure results are reflecting the query
      filtered.forEach((element) => {
        expect(element).toHaveTextContent(new RegExp(expectedText, 'i'));
      });

      // clear the field
      userEvent.clear(inputElement);
    }
  }
});
