import { type SupabaseClient } from '@supabase/supabase-js';
import { type UseQueryOptions } from '@tanstack/react-query';
import {
  VALIDATED_KEYS,
  QUERY_REFETCH_TIMES,
  QUERY_STALE_TIME_MS,
} from '../../../schemas';
import { fetchLineupOptions } from '../querys/lineup_options/lineupOptions';
import type { DbLineupOption } from '../../../types';

export const lineupQueryOptions = (
  client: SupabaseClient
): UseQueryOptions<DbLineupOption[], Error> => ({
  queryKey: [VALIDATED_KEYS.LINEUP_OPTIONS],
  queryFn: () => fetchLineupOptions(client),
  staleTime: QUERY_STALE_TIME_MS,
  retry: QUERY_REFETCH_TIMES,
  refetchOnWindowFocus: false,
});
