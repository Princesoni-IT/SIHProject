import { useCallback, useEffect, useState } from 'react';

// Standardizes the loading / error / empty / success cycle for any
// API-driven page or widget. `fetcher` should be a stable async function
// (e.g. wrapped in useCallback) that resolves to the data to display.
export function useAsync(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      setStatus('success');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, status, error, refetch: run, isLoading: status === 'loading', isError: status === 'error' };
}
