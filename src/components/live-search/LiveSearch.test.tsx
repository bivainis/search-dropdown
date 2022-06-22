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
  const dropdownElementOrNull = screen.queryByRole('listbox');

  expect(dropdownElementOrNull).not.toBeInTheDocument();
});

test('When user clicks into the input field, he/she sees the full list of managers.', async () => {
  const inputElement = screen.getByRole('textbox', { name: 'Manager search' });

  userEvent.click(inputElement);

  const list = await screen.findByRole('listbox');

  expect(list).toBeInTheDocument();

  const { getAllByRole } = within(list);
  const items = getAllByRole('option');

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
      searchQueries: ['etmc', 'etMc', 'ETmc', 'Harriet McKinney'],
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

      const list = await screen.findByRole('listbox');
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

test('preserve query on input focus loss', async () => {
  // render a helper component to test input blur
  function Test() {
    return <div data-testid="click-outside">Test</div>;
  }

  render(<Test />);

  const inputElement = screen.getByRole('textbox');
  const clickOutsideElement = screen.getByTestId('click-outside');

  userEvent.click(inputElement);

  expect(inputElement).toHaveFocus();

  userEvent.type(inputElement, 'harr');
  userEvent.click(clickOutsideElement);

  expect(inputElement).not.toHaveFocus();

  userEvent.click(inputElement);

  const list = await screen.findByRole('listbox');
  expect(list).toBeInTheDocument();

  const { getAllByRole } = within(list);
  const items = getAllByRole('option');

  expect(items.length).toBeGreaterThan(1);
  expect(inputElement).toHaveValue('harr');
});

test('dropdown is hidden after selecting an option', async () => {
  const inputElement = screen.getByRole('textbox');

  userEvent.click(inputElement);

  const list = await screen.findByRole('listbox');

  const { getAllByRole } = within(list);
  const items = getAllByRole('option');

  userEvent.click(items[1]);

  expect(list).not.toBeInTheDocument();
});

test('when input is focused, ArrowDown should focus the first item in the list', async () => {
  const inputElement = screen.getByRole('textbox');

  userEvent.click(inputElement);

  const list = await screen.findByRole('listbox');

  userEvent.keyboard('{ArrowDown}');

  const { getAllByRole } = within(list);
  const items = getAllByRole('option');

  expect(items[0]).toHaveAttribute('aria-selected', 'true');
});

test('when first item is focused, ArrowDown should focus the next item in the list', async () => {
  const inputElement = screen.getByRole('textbox');

  userEvent.click(inputElement);

  const list = await screen.findByRole('listbox');

  userEvent.keyboard('{ArrowDown}{ArrowDown}');

  const { getAllByRole } = within(list);
  const items = getAllByRole('option');

  expect(items[1]).toHaveAttribute('aria-selected', 'true');
  expect(items[1]).toHaveFocus();
});

test('clicking on an option should fill the full name in the input and hide the list', async () => {
  const inputElement = screen.getByRole('textbox');

  userEvent.click(inputElement);

  const list = await screen.findByRole('listbox');
  const { getAllByRole } = within(list);
  const items = getAllByRole('option');

  userEvent.click(items[2]);

  expect(inputElement).toHaveValue('Mathilda Summers');
});

test('esc key should clear the input', () => {
  const inputElement = screen.getByRole('textbox');

  userEvent.type(inputElement, 'Hello');

  userEvent.keyboard('{Escape}');

  expect(inputElement).not.toHaveValue();
});

test('when input is focused, Tab should focus the first item in the list', () => {});
test('when first item is focused, ArrowUp should focus back on input', () => {});
test('empty state is shown if nothing matches search query', () => {});
