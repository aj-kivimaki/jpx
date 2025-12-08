import GigsTable from './GigsTable';
import {
  site,
  sectionIds,
  type DbGig,
  type GigsSection,
  gigsQueryOptions,
} from '@jpx/shared';
import styles from './Gigs.module.css';
import useLocalized from '../../hooks/useLocalized';
import { supabase } from '../../clients';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { Spinner } from '@jpx/ui';

const Gigs = () => {
  const {
    data: gigs,
    isLoading,
    error,
  } = useQuery<DbGig[], Error>(
    gigsQueryOptions(supabase) as UseQueryOptions<DbGig[], Error>
  );

  const localize = useLocalized();

  if (error) return <p>Error loading events: {error.message}</p>;

  const { sections } = site;

  const gigsSection = sections.find((s): s is GigsSection => s.id === 'gigs');

  const title = localize(gigsSection?.title);
  const loadingText = localize(gigsSection?.loadingText);

  return (
    <div id={sectionIds.gigs} className={styles.gigs}>
      <h2 className={styles.gigsTitle}>{title}</h2>
      <div className={styles.gigsCardContainer}>
        {isLoading ? <Spinner /> : <GigsTable gigs={gigs ?? []} />}
      </div>
    </div>
  );
};

export default Gigs;
