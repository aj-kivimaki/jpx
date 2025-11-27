import React from 'react';
import GigsTable from './GigsTable';
import gigsData from 'shared/data/gigs.json';
import styles from './Gigs.module.css';
import { sections } from 'shared/data/site.json';
import { sectionIds } from 'shared/config/sectionIds';
import { useTranslation } from 'react-i18next';

interface Section {
  id: string;
  title?: { [lang: string]: string };
}

const Gigs: React.FC = () => {
  const { i18n } = useTranslation();

  // Find the gigs section and get the title for the current language
  const gigsSection = (sections as Section[]).find((s) => s.id === 'gigs');
  const title =
    gigsSection?.title?.[i18n.language] ?? gigsSection?.title?.['fi'] ?? '';

  return (
    <div id={sectionIds.gigs} className={styles.gigs}>
      <h2 className={styles.gigsTitle}>{title}</h2>
      <div className={styles.gigsCardContainer}>
        <GigsTable data={gigsData} />
      </div>
    </div>
  );
};

export default Gigs;
