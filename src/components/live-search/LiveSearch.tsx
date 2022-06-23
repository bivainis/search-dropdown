import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import useFetchData from '../../hooks/useFetchData';
import { Avatar } from '../avatar';
import styles from './LiveSearch.module.css';

interface LiveSearchProps {
  id: string;
}

/**
 * @TODO
 * - add arrow to input to indicate it's a dropdown
 * - split into components
 * - aria roles: listbox > option: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
 * - esc should clear the field
 * - keyboard navigation
 * - empty state on empty data or empty search results
 * - loading and error states
 * - ul component should accept data
 * - debounce
 * - styling
 * - documentation and sources
 * - lock node version
 * - api url env variable
 * - (maybe) abstract css values to css variables, add scss
 * - (maybe) cache results and compare when rendering
 * - (maybe) look into suspense
 * - (maybe) paginate
 * - (maybe) storybook
 * - (maybe) animations
 * - (maybe) add params on how much to fetch
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
    // @TODO: debounce
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLUListElement>
  ) => {
    setDropdownIsOpen(true);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLUListElement>
  ) => {
    switch (e.key) {
      case 'Tab':
        setSelectedItemIndex(0);

        break;

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

          if (prev < data.length) {
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
          const { firstName, lastName } = data[selectedItemIndex].attributes;

          setSearchQuery(firstName + ' ' + lastName);
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

      {dropdownIsOpen && !loading && data.length > 0 && (
        <ul
          className={styles.dropdownList}
          role="listbox"
          tabIndex={0}
          ref={ulRef}
          aria-label="Manager search listbox"
          aria-activedescendant={`option-${selectedItemIndex || 0}`}
          onKeyDown={handleKeyDown}
        >
          {data
            .filter((item) => {
              // test if string has search query, case insensitive
              const regexp = new RegExp(searchQuery, 'i');
              const variant1 = regexp.test(
                item.attributes.firstName + item.attributes.lastName
              );
              const variant2 = regexp.test(
                item.attributes.firstName + ' ' + item.attributes.lastName
              );

              return variant1 || variant2;
            })
            .map(({ id, attributes, email, rgbColorArray }, index) => {
              return (
                <li
                  className={styles.listItem}
                  id={`option-${index}`}
                  key={id}
                  role="option"
                  tabIndex={-1}
                  onClick={() =>
                    handleOptionSelect(
                      index,
                      attributes.firstName + ' ' + attributes.lastName
                    )
                  }
                  aria-selected={selectedItemIndex === index}
                  aria-label={attributes.firstName + ' ' + attributes.lastName}
                >
                  <Avatar
                    src={attributes.avatar}
                    altText={`${attributes.firstName} ${attributes.lastName} avatar image`}
                    rgbColorArray={rgbColorArray}
                    initials={
                      attributes.firstName.charAt(0) +
                      attributes.lastName.charAt(0)
                    }
                  />
                  <div>
                    <strong className={styles.name} data-testid="full-name">
                      {attributes.firstName} {attributes.lastName}
                    </strong>
                    {email}
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default LiveSearch;
