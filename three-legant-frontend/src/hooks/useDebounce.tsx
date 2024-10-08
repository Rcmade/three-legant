import { useCallback, useRef } from "react";
import debounce from "lodash.debounce";

// Custom hook to debounce any function
export const useDebounce = (fn: (...args: any[]) => void, delay: number) => {
  const debouncedFnRef = useRef(debounce(fn, delay));

  return useCallback((...args: any[]) => {
    debouncedFnRef.current(...args);
  }, []);
};
