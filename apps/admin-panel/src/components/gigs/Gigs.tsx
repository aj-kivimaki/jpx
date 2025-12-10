import {
  type DbGig,
  fetchGigs,
  logger,
  QUERY_STALE_TIME_MS,
  VALIDATED_KEYS,
} from '@jpx/shared';
import { Spinner } from '@jpx/ui';
import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../clients';

import GigsTable from './GigsTable';

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

  return isLoading ? <Spinner /> : <GigsTable gigs={gigs || []} />;
};

export default Gigs;
