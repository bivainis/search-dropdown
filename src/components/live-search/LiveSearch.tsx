import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import useFetchData from '../../hooks/useFetchData';
import { Employee } from '../../interfaces/interfaces';
import { Avatar } from '../avatar';
import ListBox from './ListBox';
import Option from './Option';

import styles from './LiveSearch.module.css';

interface LiveSearchProps {
  id: string;
}

/**
 * @TODO
 * - add arrow to input to indicate it's a dropdown, rotate on open
 * - split into list/item components
 * - ul component should accept options from parent instead of data fetching
 * - empty state on empty data or empty search results
 * - (maybe) lock node version
 * - (maybe) debounce filtering on typing
 * - (maybe) abstract css values to css variables, add scss
 * - (maybe) cache results and compare when rendering
 * - (maybe) look into suspense
 * - (maybe) storybook
 */
const LiveSearch = ({ id }: LiveSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const ulRef = useRef<HTMLUListElement>(null);
  const { loading, data, error } = useFetchData();
  const {
    elRef: wrapperRef,
    visible: dropdownIsOpen,
    setVisible: setDropdownIsOpen,
  } = useClickOutside(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLUListElement>
  ) => {
    setSelectedItemIndex(null);
    setDropdownIsOpen(true);
  };

  // @TODO: refactor
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLUListElement>
  ) => {
    switch (e.key) {
      case 'ArrowDown':
        /**
         * preventDefault fixes an issue where the first item is
         *   out of the dropdown scroll view on ArrowDown (probably arrow
         *   down starts to already scroll the list before we kick in the
         *   focus on an item). Disables scrolling on initial render when
         *   no item is selected yet.
         */
        if (selectedItemIndex === null) {
          e.preventDefault();
        }

        setSelectedItemIndex((prev) => {
          if (prev === null) {
            return 0;
          }

          if (prev < data.filter(searchFilter).length) {
            return prev + 1;
          }

          return prev;
        });

        break;
      case 'ArrowUp':
        setSelectedItemIndex((prev) => {
          if (prev === null) {
            return prev;
          }
          if (prev > 0) {
            return prev - 1;
          }

          return prev;
        });

        break;
      case 'Enter':
        if (selectedItemIndex !== null) {
          const { name } =
            data.filter(searchFilter)[selectedItemIndex].attributes;

          setSearchQuery(name);
          setDropdownIsOpen(false);
        }

        break;
      case 'Escape':
        setSearchQuery('');
        break;

      default:
        break;
    }
  };

  const handleOptionSelect = (index: number, value: string) => {
    setSelectedItemIndex(index);
    setSearchQuery(value);
    setDropdownIsOpen(false);
  };

  const focusListItem = (
    ref: React.RefObject<HTMLUListElement>,
    index: number
  ) => {
    if (ref.current?.children[index]) {
      const itemAtIndex = ref.current?.children[index] as HTMLElement;

      itemAtIndex.focus();
    }
  };

  useEffect(() => {
    if (dropdownIsOpen && selectedItemIndex !== null) {
      focusListItem(ulRef, selectedItemIndex);
    }
  }, [ulRef, selectedItemIndex, dropdownIsOpen]);

  const searchFilter = (item: Employee) => {
    // test if string has search query, case insensitive
    const regexp = new RegExp(searchQuery, 'i');
    const { name: fullName } = item.attributes;

    // tests against e.g. "JaneDoe"
    const variant1 = regexp.test(fullName.split(' ').join(''));

    // tests against e.g. "Jane Doe"
    const variant2 = regexp.test(fullName);

    return variant1 || variant2;
  };

  return (
    <div className={styles.container} ref={wrapperRef}>
      <input
        aria-label="Manager search"
        className={styles.input}
        id={id}
        type="text"
        placeholder="Choose Manager"
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
      />

      {dropdownIsOpen && !loading && data.filter(searchFilter).length > 0 && (
        <ListBox ulRef={ulRef} keyDownHandler={handleKeyDown}>
          {data
            .filter(searchFilter)
            .map(
              (
                {
                  id,
                  attributes: { name, firstName, lastName, avatar },
                  email,
                  rgbColorArray,
                },
                index
              ) => {
                return (
                  <Option
                    id={`option-${id}`}
                    key={id}
                    clickHandler={() => handleOptionSelect(index, name)}
                    isSelected={selectedItemIndex === index}
                    label={name}
                    secondaryText={email}
                  >
                    <Avatar
                      src={avatar}
                      altText={`${name} avatar image`}
                      rgbColorArray={rgbColorArray}
                      initials={firstName.charAt(0) + lastName.charAt(0)}
                    />
                  </Option>
                );
              }
            )}
        </ListBox>
      )}
    </div>
  );
};

export default LiveSearch;
