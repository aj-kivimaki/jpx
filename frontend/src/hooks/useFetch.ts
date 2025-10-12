import { useState, useEffect } from 'react';
import axios, { type AxiosRequestConfig, AxiosError } from 'axios';

interface UseFetchOptions extends AxiosRequestConfig {}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {},
  retries: number = 2
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    let canceled = false;

    const fetchData = async (attempt: number = 0) => {
      setLoading(true);
      try {
        const response = await axios.get<T>(url, {
          withCredentials: options.withCredentials || false,
          headers: options.headers || {},
        });

        if (!canceled) {
          setData(response.data);
          setError(null);
        }
      } catch (err: unknown) {
        if (attempt < retries) {
          // Retry after 500ms
          setTimeout(() => fetchData(attempt + 1), 500);
        } else if (!canceled) {
          const axiosError = err as AxiosError;
          if (axiosError.response) {
            setError(
              `Server Error: ${axiosError.response.status} ${axiosError.response.statusText}`
            );
          } else if (axiosError.request) {
            setError(
              'No response from server. Possible CORS or network issue.'
            );
          } else {
            setError((err as Error).message);
          }
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      canceled = true; // cancel state updates if component unmounts
    };
  }, [url, options, retries]);

  return { data, loading, error };
}

export default useFetch;
