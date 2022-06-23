import styles from './ListBox.module.css';

interface ListBoxProps {
  children?: React.ReactNode;
  ulRef: React.Ref<HTMLUListElement>;
  keyDownHandler: React.KeyboardEventHandler<HTMLUListElement>;
}

/**
 * ListBox compoennt, representing ul[role="listbox"]
 * Accepts option list as children.
 *
 * @example
 *
 * <ListBox>
 *   <Option />
 *   <Option />
 * </ListBox>
 */
const ListBox = ({ children, ulRef, keyDownHandler }: ListBoxProps) => {
  return (
    <ul
      className={styles.dropdownList}
      role="listbox"
      tabIndex={0}
      ref={ulRef}
      aria-label="Manager search listbox"
      onKeyDown={keyDownHandler}
    >
      {children}
    </ul>
  );
};

export default ListBox;
