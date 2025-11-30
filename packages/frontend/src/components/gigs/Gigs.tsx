import { useTranslation } from 'react-i18next';
import GigsTable from './GigsTable';
import { useSupabaseFetch } from '../../hooks/useSupabaseFetch';
import { site, sectionIds, getLang, type GigForm } from 'shared';
import styles from './Gigs.module.css';

const Gigs = () => {
  const { i18n } = useTranslation();

  const {
    data: gigs,
    loading,
    error,
  } = useSupabaseFetch<GigForm>('gigs', '*', 'date', true);

  if (error) return <p>Error loading events: {error.message}</p>;
  if (loading) return <p>Loading events...</p>;

  const { sections } = site;

  const lang = getLang(i18n);
  const gigsSection = sections.find((s) => s.id === 'gigs');
  const title = gigsSection?.title?.[lang] ?? gigsSection?.title?.fi ?? '';

  return (
    <div id={sectionIds.gigs} className={styles.gigs}>
      <h2 className={styles.gigsTitle}>{title}</h2>
      <div className={styles.gigsCardContainer}>
        <GigsTable gigs={gigs} />
      </div>
    </div>
  );
};

export default Gigs;
