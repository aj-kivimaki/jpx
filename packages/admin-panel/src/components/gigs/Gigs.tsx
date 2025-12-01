import styles from './Gigs.module.css';
import { type GigForm } from 'shared';
import { useSupabaseFetch } from 'shared';
import GigsTable from './GigsTable';
import { supabase } from '../../config/supabaseClient';

const Gigs = () => {
  const {
    data: gigs,
    isLoading,
    error,
  } = useSupabaseFetch<GigForm>(supabase, 'gigs', '*', 'date', true);

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
