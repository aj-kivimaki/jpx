import { useQuery } from '@tanstack/react-query';
import { supabase } from '../clients/supabaseClient';
import type { PostgrestError } from '@supabase/supabase-js';
import { QUERY_REFETCH_TIMES, QUERY_STALE_TIME_MS } from 'shared';

interface UseSupabaseFetchResult<T = unknown> {
  data: T[] | undefined;
  isLoading: boolean;
  error: PostgrestError | Error | null;
}

export const useSupabaseFetch = <T = unknown>(
  tableName: string,
  columns: string = '*',
  orderBy: string = 'date',
  ascending: boolean = true
): UseSupabaseFetchResult<T> => {
  const fetcher = async (): Promise<T[]> => {
    const { data, error } = await supabase
      .from(tableName)
      .select(columns)
      .order(orderBy, { ascending });

    if (error) throw error;
    return data as T[];
  };

  const { data, isLoading, error } = useQuery<T[], PostgrestError | Error>({
    queryKey: [tableName, columns, orderBy, ascending],
    queryFn: fetcher,
    staleTime: QUERY_STALE_TIME_MS,
    retry: QUERY_REFETCH_TIMES,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
};
