import { useEffect, useRef, useState } from 'react';

/**
 * Controls clicking outside of an element reference by checking if the
 *   element reference doesn't contain contain currently clicked element.
 *
 * @param initialVisible - sets initial visible state
 * @returns an object of element reference, visibility getter and setter
 */
const useClickOutside = (initialVisible: boolean) => {
  const elRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(initialVisible);

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      if (!elRef.current?.contains(e.target as HTMLElement)) {
        setVisible((prev) => !prev);
      }
    };

    // only add event when element is visible, remove if not
    if (visible) {
      window.addEventListener('click', handleWindowClick);
    } else {
      window.removeEventListener('click', handleWindowClick);
    }

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  });

  return { elRef, visible, setVisible };
};

export default useClickOutside;
