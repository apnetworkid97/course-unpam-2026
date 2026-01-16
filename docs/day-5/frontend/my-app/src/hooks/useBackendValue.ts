import { useState, useCallback } from 'react';

export function useBackendValue(isConnected: boolean) {
  const [value, setValue] = useState<string>('0');
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchValue = useCallback(async () => {
    if (!isConnected) {
      setValue('0');
      return;
    }

    try {
      setIsReading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blockchain/value`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setValue(data.value);
    } catch {
      setError('Failed to fetch blockchain data');
    } finally {
      setIsReading(false);
    }
  }, [isConnected]);

  return {
    value,
    isReading,
    error,
    fetchValue,
  };
}
