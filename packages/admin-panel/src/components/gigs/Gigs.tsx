import styles from './Gigs.module.css';
import { type GigForm } from 'shared';
import { useSupabaseFetch } from '../../hooks/useSupabaseFetch';
import GigsTable from './GigsTable';

const Gigs = () => {
  const {
    data: gigs,
    loading,
    error,
  } = useSupabaseFetch<GigForm>('gigs', '*', 'date', true);

  if (error) return <p>Error loading events: {error.message}</p>;
  if (loading) return <p>Loading events...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.gigs}>
        <GigsTable data={gigs} />
      </div>
    </div>
  );
};

export default Gigs;
