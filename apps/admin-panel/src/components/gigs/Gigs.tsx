import {
  type DbGig,
  fetchGigs,
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

  return (
    <>
      {error ? (
        <p>{error.message}</p>
      ) : (
        <div data-cy="gigs-list">
          {isLoading ? <Spinner /> : <GigsTable gigs={gigs || []} />}
        </div>
      )}
    </>
  );
};

export default Gigs;
