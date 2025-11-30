import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import type { PostgrestError } from '@supabase/supabase-js';

/**
 * Custom hook to fetch data from Supabase.
 * @param {string} tableName - Name of the Supabase table.
 * @param {string} [columns='*'] - Columns to select.
 */

interface UseSupabaseFetchResult<T = unknown> {
  data: T[];
  loading: boolean;
  error: PostgrestError | Error | null;
}

export const useSupabaseFetch = <T = unknown>(
  tableName: string,
  columns: string = '*',
  orderBy: string = 'date',
  ascending: boolean = true
): UseSupabaseFetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const query = supabase
        .from(tableName)
        .select(columns)
        .order(orderBy, { ascending });

      try {
        const { data: result, error: fetchError } = await query;

        if (fetchError) {
          setError(fetchError);
          setData([] as T[]);
        } else {
          setData(result as T[]);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setData([] as T[]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, columns, orderBy, ascending]);

  return { data, loading, error };
};
