import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import setupMockServer from '../../mocks/mock-service-worker-server';
import ClickOutside from '../../helpers/test-helpers';
import LiveSearch from './LiveSearch';

const server = setupMockServer;

beforeAll(() => server.listen());

beforeEach(() => {
  render(<LiveSearch id="manager-search" />);
});

afterEach(() => {
  cleanup();
});

afterAll(() => server.close());

// gets and focuses input
const focusInput = (role: string) => {
  const inputElement = screen.getByRole(role);
  userEvent.click(inputElement);

  return inputElement;
};

const getItems = (list: HTMLElement, role: string) => {
  const { getAllByRole } = within(list);
  return getAllByRole(role);
};

test('Renders select component without errors.', () => {
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('User can focus on the input field', () => {
  expect(focusInput('textbox')).toHaveFocus();
});

test('Dropdown is hidden on initial render', () => {
  const list = screen.queryByRole('listbox');

  expect(list).not.toBeInTheDocument();
});

test('When user clicks into the input field, he/she sees the full list of managers.', async () => {
  focusInput('textbox');

  const list = await screen.findByRole('listbox');

  expect(list).toBeInTheDocument();

  const { getAllByRole } = within(list);
  const items = getAllByRole('option');

  expect(items.length).toBeGreaterThan(1);
});

test('filter dropdown based on a query', async () => {
  const inputElement = screen.getByRole('textbox');

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
  render(<ClickOutside />);

  const inputElement = focusInput('textbox');

  const clickOutsideElement = screen.getByTestId('click-outside');

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

test('dropdown is closed when clicking outside', async () => {
  render(<ClickOutside />);

  focusInput('textbox');

  const clickOutsideElement = screen.getByTestId('click-outside');
  const list = await screen.findByRole('listbox');

  userEvent.click(clickOutsideElement);

  expect(list).not.toBeInTheDocument();
});

test('dropdown is hidden after selecting an option', async () => {
  focusInput('textbox');

  const list = await screen.findByRole('listbox');
  const items = getItems(list, 'option');

  userEvent.click(items[1]);

  expect(list).not.toBeInTheDocument();
});

test('when input is focused, ArrowDown should focus the first item in the list', async () => {
  focusInput('textbox');

  const list = await screen.findByRole('listbox');
  const firstItem = getItems(list, 'option')[0];

  userEvent.keyboard('{ArrowDown}');

  expect(firstItem).toHaveAttribute('aria-selected', 'true');
});

test('when first item is focused, ArrowDown should focus the next item in the list', async () => {
  focusInput('textbox');

  const list = await screen.findByRole('listbox');
  const secondItem = getItems(list, 'option')[1];

  userEvent.keyboard('{ArrowDown}{ArrowDown}');

  expect(secondItem).toHaveAttribute('aria-selected', 'true');
  expect(secondItem).toHaveFocus();
});

test('clicking on an option should fill the full name in the input and hide the list', async () => {
  const input = focusInput('textbox');
  const list = await screen.findByRole('listbox');
  const thirdItem = getItems(list, 'option')[2];

  userEvent.click(thirdItem);

  expect(input).toHaveValue('Mathilda Summers');
});

test('esc key should clear the input', () => {
  const input = focusInput('textbox');

  userEvent.type(input, 'Hello');
  userEvent.keyboard('{Escape}');

  expect(input).not.toHaveValue();
});

test('enter key should set input value and close the dropdown', async () => {
  const input = focusInput('textbox');
  const list = await screen.findByRole('listbox');

  userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');

  expect(input).toHaveValue('Harriet Banks');
  expect(input).not.toHaveFocus();
  expect(list).not.toBeInTheDocument();
});

test('arrow navigation works on filtered list', async () => {
  const input = focusInput('textbox');
  await screen.findByRole('listbox');

  userEvent.type(input, 'har');

  userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');

  expect(input).toHaveValue('Harriet Banks');

  userEvent.clear(input);
  userEvent.type(input, 'ma');
  userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{Enter}');

  expect(input).toHaveValue('Marguerite Ryan');
});

// @TODO:
xtest('when input is focused, Tab should focus the first item in the list', () => {});
xtest('when first item is focused, ArrowUp should focus back on input', () => {});
xtest('empty state is shown if nothing matches search query', () => {});
xtest('hitting esc on an empty input should close the dropdown', () => {});
