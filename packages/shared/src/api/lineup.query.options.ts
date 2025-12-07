import { type SupabaseClient } from '@supabase/supabase-js';
import {
  VALIDATED_KEYS,
  QUERY_REFETCH_TIMES,
  QUERY_STALE_TIME_MS,
} from '../schemas';
import { fetchLineupOptions } from './lineup.options';

export const lineupQueryOptions = (client: SupabaseClient) => ({
  queryKey: [VALIDATED_KEYS.LINEUP_OPTIONS],
  queryFn: () => fetchLineupOptions(client),
  staleTime: QUERY_STALE_TIME_MS,
  retry: QUERY_REFETCH_TIMES,
  refetchOnWindowFocus: false,
});
