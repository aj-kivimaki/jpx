import { useQuery } from '@tanstack/react-query';
import GigsTable from './GigsTable';
import { supabase } from '../../clients';
import { gigsQueryOptions } from '@jpx/shared';
import styles from './Gigs.module.css';

const Gigs = () => {
  const { data: gigs, isLoading, error } = useQuery(gigsQueryOptions(supabase));

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
