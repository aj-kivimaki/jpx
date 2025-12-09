import { useQuery } from '@tanstack/react-query';
import GigsTable from './GigsTable';
import { supabase } from '../../clients';
import { Spinner } from '@jpx/ui';
import {
  fetchGigs,
  type DbGig,
  logger,
  VALIDATED_KEYS,
  QUERY_STALE_TIME_MS,
} from '@jpx/shared';

const Gigs = () => {
  const {
    data: gigs,
    isLoading,
    error,
  } = useQuery<DbGig[], Error>({
    queryKey: [VALIDATED_KEYS.GIGS, 'all'],
    queryFn: () => fetchGigs(supabase) as Promise<DbGig[]>,
    staleTime: QUERY_STALE_TIME_MS,
    refetchOnWindowFocus: false,
  });

  if (error) {
    logger.error('Failed to load gigs (admin)', error);
    return <p>Error loading events: {error.message}</p>;
  }

  return !isLoading ? <GigsTable gigs={gigs || []} /> : <Spinner />;
};

export default Gigs;
