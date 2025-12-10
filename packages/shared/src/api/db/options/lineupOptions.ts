import { type SupabaseClient } from '@supabase/supabase-js';
import { type UseQueryOptions } from '@tanstack/react-query';
import {
  VALIDATED_KEYS,
  QUERY_STALE_TIME_MS,
  QUERY_REFETCH_TIMES,
} from '../../../schemas';
import { fetchLineupOptions } from '../querys';
import type { DbLineupOption } from '../../../types';

export const lineupQueryOptions = (
  client: SupabaseClient
): UseQueryOptions<DbLineupOption[], Error> => ({
  queryKey: [VALIDATED_KEYS.LINEUP_OPTIONS],
  queryFn: () => fetchLineupOptions(client),
  staleTime: QUERY_STALE_TIME_MS,
  retry: QUERY_REFETCH_TIMES,
  refetchOnWindowFocus: false,
  placeholderData: [], // initialData: [] ?
});
