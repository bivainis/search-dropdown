import styles from './Option.module.css';

interface OptionProps {
  id: string;
  children?: React.ReactNode;
  label: string;
  isSelected: boolean;
  clickHandler: React.MouseEventHandler<HTMLLIElement>;
  secondaryText: string;
}

/**
 * Option component for ListBox.
 * Accepts optional <Avatar/> component as {children}
 *
 * @example
 * <Option>
 *   <Avatar/>
 * </Option>
 */
const Option = ({
  id,
  children,
  label,
  isSelected,
  clickHandler,
  secondaryText,
}: OptionProps) => {
  return (
    <li
      role="option"
      id={id}
      className={styles.listItem}
      tabIndex={-1}
      aria-selected={isSelected}
      aria-label={label}
      onClick={clickHandler}
    >
      {children}

      <div>
        <strong className={styles.name} data-testid="full-name">
          {label}
        </strong>
        {secondaryText}
      </div>
    </li>
  );
};

export default Option;
