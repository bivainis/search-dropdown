import { ChangeEvent, useEffect, useState } from 'react';
import { API_URL } from '../../urls';
import { Avatar } from '../avatar';
import styles from './LiveSearch.module.css';

interface LiveSearchProps {
  id: string;
}

interface Employee {
  id: number;
  attributes: {
    avatar: string;
    firstName: string;
    lastName: string;
  };
  email: string;
  relationships: {
    account: {
      data: {
        id: number;
      };
    };
  };
}

interface Relationship {
  type: string;
  id: number;
  attributes: {
    email: string;
  };
}

/**
 * @TODO
 * - tests
 * - test utils
 * - abstract fetching to a hook
 * - add arrow to input to indicate it's a dropdown
 * - split into components
 * - aria roles: listbox > option: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role
 * - esc should clear the field
 * - keyboard navigation
 * - debounce
 * - styling
 * - documentation and sources
 * - lock node version
 * - api url env variable
 * - (maybe) cache results and compare when rendering
 * - (maybe) look into suspense
 * - (maybe) paginate
 * - (maybe) storybook
 * - (maybe) animations
 * - (maybe) add params on how much to fetch
 */
const LiveSearch = ({ id }: LiveSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Employee[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setDropdownIsOpen((current) => !current);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);

      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        setData(
          json.data.map((item: Employee) => {
            const relationship = json.included.find((i: Relationship) => {
              return i.id === item.relationships.account.data.id;
            });
            const email = relationship.attributes.email;

            return {
              ...item,
              email,
            };
          })
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className={styles.container}>
      <input
        aria-label="Manager search"
        className={styles.input}
        id={id}
        type="text"
        placeholder="Choose Manager"
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputFocus}
      />

      {loading && <p>Loading...</p>}

      {error && <p>An error occurred</p>}

      {dropdownIsOpen && !loading && data.length > 0 && (
        <ul className={styles.dropdownList}>
          {data
            .filter((item) => {
              // test if string has search query, case insensitive
              const regexp = new RegExp(searchQuery, 'i');
              return regexp.test(
                item.attributes.firstName + item.attributes.lastName
              );
            })
            .map(({ id, attributes, email }) => {
              return (
                <li className={styles.listItem} key={id}>
                  <Avatar
                    src={attributes.avatar}
                    altText={`${attributes.firstName} ${attributes.lastName} avatar image`}
                    initials={
                      attributes.firstName.charAt(0) +
                      attributes.lastName.charAt(0)
                    }
                  />
                  <div>
                    <strong className={styles.name}>
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
