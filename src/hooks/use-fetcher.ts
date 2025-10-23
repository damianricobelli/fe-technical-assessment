import React from "react";

type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

export function useFetcher<T>(fetcher: Fetcher<T>) {
  const cache = React.useRef<T>(null);

  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  const load = async () => {
    if (cache.current) {
      setData(cache.current);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher(controller.signal);
      cache.current = result;
      setData(result);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  // trigger initial fetch if data is null
  if (data === null && !loading && !error) {
    load();
  }

  return { data, loading, error, reload: load };
}