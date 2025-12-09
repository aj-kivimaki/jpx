import { type SupabaseClient } from '@supabase/supabase-js';
import { type UseQueryOptions } from '@tanstack/react-query';
import { fetchGigs } from '../querys';
import {
  VALIDATED_KEYS,
  QUERY_REFETCH_TIMES,
  QUERY_STALE_TIME_MS,
} from '../../../schemas';
import type { DbGig } from '../../../types';
import {
  AppError,
  withPagination,
  type PaginationResult,
} from '../../../utils';

export const gigsQueryOptions = (
  client: SupabaseClient,
  page?: number,
  pageSize?: number
): UseQueryOptions<PaginationResult<DbGig>, AppError> => ({
  queryKey: [VALIDATED_KEYS.GIGS],
  queryFn: () => withPagination<DbGig>(() => fetchGigs(client), page, pageSize),
  staleTime: QUERY_STALE_TIME_MS,
  retry: QUERY_REFETCH_TIMES,
  refetchOnWindowFocus: false,
});
