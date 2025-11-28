import GigsTable from './GigsTable';
import { gigs } from 'shared/data';
import styles from './Gigs.module.css';
import { site } from 'shared/data/site';
import { sectionIds } from 'shared/config';
import { useTranslation } from 'react-i18next';
import type { Language } from 'shared/types';

const Gigs: React.FC = () => {
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
