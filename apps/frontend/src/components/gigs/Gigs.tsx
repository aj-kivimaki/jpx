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
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@jpx/ui';
import { FETCH_GIGS_PAGE_SIZE, FETCH_GIGS_START_PAGE } from '../../config';

const Gigs = () => {
  const query = useQuery(
    gigsQueryOptions(supabase, FETCH_GIGS_START_PAGE, FETCH_GIGS_PAGE_SIZE)
  );

  const { data: gigsResult, isLoading, error } = query;

  const localize = useLocalized();

  if (error) return <p>Error loading events: {error.message}</p>;

  const { sections } = site;

  const gigsSection = sections.find((s): s is GigsSection => s.id === 'gigs');

  const title = localize(gigsSection?.title);
  const gigs: DbGig[] = gigsResult?.data ?? [];
  return (
    <div id={sectionIds.gigs} className={styles.gigs}>
      <h2 className={styles.gigsTitle}>{title}</h2>
      <div className={styles.gigsCardContainer}>
        {isLoading ? <Spinner /> : <GigsTable gigs={gigs} />}
      </div>
    </div>
  );
};

export default Gigs;
