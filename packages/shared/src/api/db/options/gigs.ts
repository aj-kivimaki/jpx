import { type SupabaseClient } from '@supabase/supabase-js';
import { type UseQueryOptions } from '@tanstack/react-query';
import { fetchGigs } from '../querys';
import {
  VALIDATED_KEYS,
  QUERY_REFETCH_TIMES,
  QUERY_STALE_TIME_MS,
} from '../../../schemas';
import type { DbGig } from '../../../types';

export const gigsQueryOptions = (
  client: SupabaseClient
): UseQueryOptions<DbGig[], Error> => ({
  queryKey: [VALIDATED_KEYS.GIGS],
  queryFn: () => fetchGigs(client),
  staleTime: QUERY_STALE_TIME_MS,
  retry: QUERY_REFETCH_TIMES,
  refetchOnWindowFocus: false,
});
