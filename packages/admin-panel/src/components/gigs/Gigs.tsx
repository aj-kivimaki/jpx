import { useQuery } from '@tanstack/react-query';
import GigsTable from './GigsTable';
import { supabase } from '../../config/supabaseClient';
import {
  fetchGigs,
  QUERY_REFETCH_TIMES,
  QUERY_STALE_TIME_MS,
  type GigForm,
} from 'shared';
import styles from './Gigs.module.css';

const Gigs = () => {
  const {
    data: gigs,
    isLoading,
    error,
  } = useQuery<GigForm[], Error>({
    queryKey: ['gigs'],
    queryFn: () => fetchGigs(supabase),
    staleTime: QUERY_STALE_TIME_MS,
    retry: QUERY_REFETCH_TIMES,
    refetchOnWindowFocus: false,
  });

  if (error) return <p>Error loading events: {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.gigs}>
        {isLoading ? (
          <p className={styles.gigsLoadingText}>Lataa keikkoja...</p>
        ) : (
          <GigsTable gigs={gigs ?? []} />
        )}
      </div>
    </div>
  );
};

export default Gigs;
