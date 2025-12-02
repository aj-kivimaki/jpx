import { SupabaseClient } from '@supabase/supabase-js';
import {
  QUERY_KEY_GIGS,
  QUERY_REFETCH_TIMES,
  QUERY_STALE_TIME_MS,
} from '../schemas';
import { fetchGigs } from './gigs';

export const gigsQueryOptions = (client: SupabaseClient) => ({
  queryKey: QUERY_KEY_GIGS,
  queryFn: () => fetchGigs(client),
  staleTime: QUERY_STALE_TIME_MS,
  retry: QUERY_REFETCH_TIMES,
  refetchOnWindowFocus: false,
});
