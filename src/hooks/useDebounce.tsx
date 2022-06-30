import { useEffect, useState } from "react";
import { SearchType } from "../App";

const useDebounce = (value: SearchType, delay: number): SearchType => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export { useDebounce };
