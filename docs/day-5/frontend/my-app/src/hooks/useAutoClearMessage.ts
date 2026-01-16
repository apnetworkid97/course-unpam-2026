import { useEffect } from 'react';

export function useAutoClearMessage(
  value: string | null,
  clearFn: () => void,
  delay = 5000
) {
  useEffect(() => {
    if (!value) return;
    const timer = setTimeout(clearFn, delay);
    return () => clearTimeout(timer);
  }, [value, clearFn, delay]);
}
