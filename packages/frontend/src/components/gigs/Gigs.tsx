import GigsTable from './GigsTable';
import {
  site,
  sectionIds,
  type GigForm,
  type GigsSection,
  fetchGigs,
  QUERY_STALE_TIME_MS,
  QUERY_REFETCH_TIMES,
} from 'shared';
import styles from './Gigs.module.css';
import useLocalized from '../../hooks/useLocalized';
import { supabase } from '../../config/supabaseClient';
import { useQuery } from '@tanstack/react-query';

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
        {isLoading ? (
          <p className={styles.gigsLoadingText}>{loadingText}</p>
        ) : (
          <GigsTable gigs={gigs ?? []} />
        )}
      </div>
    </div>
  );
};

export default Gigs;
