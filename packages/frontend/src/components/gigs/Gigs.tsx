import { useTranslation } from 'react-i18next';
import GigsTable from './GigsTable';
import { gigs, site } from 'shared/data';
import { sectionIds, type Language } from 'shared/schemas';
import styles from './Gigs.module.css';

const Gigs = () => {
  const { i18n } = useTranslation();
  const { sections } = site;

  const lang = i18n.language as Language;
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
