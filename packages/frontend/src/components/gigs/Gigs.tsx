import GigsTable from './GigsTable';
import { useSupabaseFetch } from 'shared';
import { site, sectionIds, type GigForm, type GigsSection } from 'shared';
import styles from './Gigs.module.css';
import useLocalized from '../../hooks/useLocalized';
import { supabase } from '../../config/supabaseClient';

const Gigs = () => {
  const {
    data: gigs,
    isLoading,
    error,
  } = useSupabaseFetch<GigForm>(supabase, 'gigs', '*', 'date', true);

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
