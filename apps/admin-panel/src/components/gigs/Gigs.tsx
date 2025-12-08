import { useQuery } from '@tanstack/react-query';
import GigsTable from './GigsTable';
import { supabase } from '../../clients';
import { gigsQueryOptions } from '@jpx/shared';
import { Spinner } from '@jpx/ui';

const Gigs = () => {
  const { data: gigs, isLoading, error } = useQuery(gigsQueryOptions(supabase));

  return (
    <>
      {error && <p>Error loading events: {error.message}</p>}
      {!error && isLoading ? <Spinner /> : <GigsTable gigs={gigs ?? []} />}
    </>
  );
};

export default Gigs;
