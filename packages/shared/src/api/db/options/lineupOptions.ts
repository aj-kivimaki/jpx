import { type SupabaseClient } from '@supabase/supabase-js';
import { type UseQueryOptions } from '@tanstack/react-query';

import {
  QUERY_REFETCH_TIMES,
  QUERY_STALE_TIME_MS,
  VALIDATED_KEYS,
} from '../../../schemas';
import type { DbLineupOption } from '../../../types';
import { fetchLineupOptions } from '../querys';

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
