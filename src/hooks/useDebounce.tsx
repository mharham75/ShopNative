import { useEffect, useState } from 'react';

type useDebouncePropTypes = {
  value: string;
  delay: number;
};

export const useDebounce = (props: useDebouncePropTypes) => {
  const { value, delay } = props;

  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};
