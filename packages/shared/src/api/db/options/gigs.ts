import { type SupabaseClient } from '@supabase/supabase-js';
import { fetchGigs } from '../querys';
import type { PaginationResult } from '../../../utils/withPagination';
import type { DbGig } from '../../../types';
import {
  VALIDATED_KEYS,
  QUERY_REFETCH_TIMES,
  QUERY_STALE_TIME_MS,
} from '../../../schemas';

/**
 * Options for a single-page query (useQuery).
 * If `page` is provided the queryFn will return a PaginationResult for that page.
 */
export const gigsQueryOptions = (
  client: SupabaseClient,
  page?: number,
  pageSize: number = 5
) => ({
  queryKey: [VALIDATED_KEYS.GIGS, page ?? 1, pageSize],
  queryFn: () => fetchGigs(client, page ?? 1, pageSize),
  staleTime: QUERY_STALE_TIME_MS,
  retry: QUERY_REFETCH_TIMES,
  refetchOnWindowFocus: false,
});

/**
 * Options tailored for use with useInfiniteQuery.
 */
export const gigsInfiniteOptions = (
  client: SupabaseClient,
  pageSize: number = 5
) => ({
  queryKey: [VALIDATED_KEYS.GIGS],
  queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
    fetchGigs(client, pageParam, pageSize),
  getNextPageParam: (lastPage: PaginationResult<DbGig> | undefined) =>
    lastPage?.hasNextPage && lastPage.page + 1,
  initialPageParam: 1,
  staleTime: QUERY_STALE_TIME_MS,
  retry: QUERY_REFETCH_TIMES,
  refetchOnWindowFocus: false,
});
