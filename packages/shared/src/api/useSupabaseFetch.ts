import { useQuery } from '@tanstack/react-query';
import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { QUERY_REFETCH_TIMES, QUERY_STALE_TIME_MS } from '../utils';

interface UseSupabaseFetchResult<T = unknown> {
  data: T[] | undefined;
  isLoading: boolean;
  error: PostgrestError | Error | null;
}

/**
 * Hook: useSupabaseFetch
 *
 * Lightweight typed helper that fetches rows from a Supabase table using
 * `@tanstack/react-query`. The hook delegates the actual DB call to the
 * provided `SupabaseClient` and returns a small result object containing
 * `data`, `isLoading` and `error` for easy consumption in components.
 *
 * Generics:
 * - `T` is the row type returned from Supabase for the given table (e.g.
 *   the shared `Gig` or `GigForm` type). Provide a specific type when
 *   calling the hook to get typed results in your components.
 *
 * Parameters:
 * @param client - A configured `SupabaseClient` instance (from `createClient`).
 * @param tableName - The table name to query (e.g. `'gigs'`).
 * @param columns - The select columns expression (default: `'*'`).
 * @param orderBy - Column name to order results by (default: `'date'`).
 * @param ascending - Order direction (default: `true` = ascending).
 *
 * Returns:
 * An object with:
 * - `data`: `T[] | undefined` — rows returned from Supabase (undefined while loading)
 * - `isLoading`: `boolean` — true while the query is loading
 * - `error`: `PostgrestError | Error | null` — error object when the request fails
 *
 * Notes & best practices:
 * - This hook uses `react-query`'s object-style `useQuery` call with a
 *   stable `queryKey` derived from the query parameters so results are
 *   cached and shared automatically.
 * - Use a concrete generic type when calling the hook for safe typing:
 *   `const { data } = useSupabaseFetch<Gig>(supabase, 'gigs')`.
 * - The hook throws Supabase errors inside the query function so `error`
 *   will contain a `PostgrestError` when the request fails.
 * - The `QUERY_STALE_TIME_MS` and `QUERY_REFETCH_TIMES` constants (from
 *   the shared package) control caching and retry behaviour.
 * - SSR caveat: this hook reads `document`/window indirectly via react-query
 *   behaviours — don't call it during server-side rendering unless you
 *   handle hydration carefully.
 *
 * Example:
 * ```ts
 * // Minimal example (no JSX in this snippet):
 * const { data } = useSupabaseFetch<{ id: string; date: string; lineup_fi: string }>(
 *   supabase,
 *   'gigs'
 * );
 * ```
 */

export const useSupabaseFetch = <T = unknown>(
  client: SupabaseClient,
  tableName: string,
  columns: string = '*',
  orderBy: string = 'date',
  ascending: boolean = true
): UseSupabaseFetchResult<T> => {
  const fetcher = async (): Promise<T[]> => {
    const { data, error } = await client
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
