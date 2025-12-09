import { type SupabaseClient } from '@supabase/supabase-js';
import { fetchGigs } from '../querys';
import { type DbGig, type PaginationResult } from '../../../types';
import {
  VALIDATED_KEYS,
  QUERY_REFETCH_TIMES,
  QUERY_STALE_TIME_MS,
} from '../../../schemas';
import type {
  UseInfiniteQueryOptions,
  QueryFunctionContext,
  InfiniteData,
} from '@tanstack/react-query';

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
): UseInfiniteQueryOptions<
  PaginationResult<DbGig>,
  Error,
  InfiniteData<PaginationResult<DbGig>, number>,
  readonly string[]
> => ({
  queryKey: [VALIDATED_KEYS.GIGS] as const,
  queryFn: ({ pageParam }: QueryFunctionContext<readonly string[]>) => {
    const page = typeof pageParam === 'number' ? pageParam : 1;
    return fetchGigs(client, page, pageSize);
  },
  getNextPageParam: (lastPage: PaginationResult<DbGig> | undefined) =>
    lastPage?.hasNextPage ? lastPage.page + 1 : undefined,
  initialPageParam: 1,
  staleTime: QUERY_STALE_TIME_MS,
  retry: QUERY_REFETCH_TIMES,
  refetchOnWindowFocus: false,
});
