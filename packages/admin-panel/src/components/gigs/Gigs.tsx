import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import GigsTable from './GigsTable';
import { supabase } from '../../clients/supabaseClient';
import { gigsQueryOptions, type GigForm } from 'shared';
import styles from './Gigs.module.css';

const Gigs = () => {
  const {
    data: gigs,
    isLoading,
    error,
  } = useQuery<GigForm[], Error>(
    gigsQueryOptions(supabase) as UseQueryOptions<GigForm[], Error>
  );

  return (
    <div className={styles.container}>
      <div className={styles.gigs}>
        {error && <p>Error loading events: {error.message}</p>}
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
