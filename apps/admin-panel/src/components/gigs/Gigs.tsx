import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import GigsTable from './GigsTable';
import { supabase } from '../../clients/supabaseClient';
import { gigsQueryOptions, type DbGig } from '@jpx/shared';
import styles from './Gigs.module.css';

const Gigs = () => {
  const {
    data: gigs,
    isLoading,
    error,
  } = useQuery<DbGig[], Error>(
    gigsQueryOptions(supabase) as UseQueryOptions<DbGig[], Error>
  );

  return (
    <>
      {error && <p>Error loading events: {error.message}</p>}
      {isLoading ? (
        <p className={styles.gigsLoadingText}>Lataa keikkoja...</p>
      ) : (
        <GigsTable gigs={gigs ?? []} />
      )}
    </>
  );
};

export default Gigs;
