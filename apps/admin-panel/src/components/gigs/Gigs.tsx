import { useQuery } from '@tanstack/react-query';
import GigsTable from './GigsTable';
import { supabase } from '../../clients';
import { Spinner } from '@jpx/ui';
import { gigsQueryOptions, type DbGig } from '@jpx/shared';

const Gigs = () => {
  const {
    data: gigsResult,
    isLoading,
    error,
  } = useQuery(gigsQueryOptions(supabase));

  const gigs: DbGig[] = gigsResult?.data ?? [];

  return (
    <>
      {error && <p>Error loading events: {error.message}</p>}
      {!error && isLoading ? <Spinner /> : <GigsTable gigs={gigs} />}
    </>
  );
};

export default Gigs;
