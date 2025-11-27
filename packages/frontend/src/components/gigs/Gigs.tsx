import React from 'react';
import GigsTable from './GigsTable';
import gigsData from 'shared/data/gigs.json';
import styles from './Gigs.module.css';
import { sections } from 'shared/data/site.json';
import { sectionIds } from 'shared/config/sectionIds';
import { useTranslation } from 'react-i18next';
import type { Gig } from 'shared/types/gig-type';

interface Section {
  id: string;
  title?: { [lang: string]: string };
}

interface I18nString {
  fi: string;
  en: string;
}

const Gigs: React.FC = () => {
  const { i18n } = useTranslation();

  // Find the gigs section and get the title for the current language
  const gigsSection = (sections as Section[]).find((s) => s.id === 'gigs');
  const title =
    gigsSection?.title?.[i18n.language] ?? gigsSection?.title?.['fi'] ?? '';

  // Normalize gigs data so nullable note fields are strings to satisfy the Gig type
  const normalizeGigs = (data: Partial<Gig>[]): Gig[] => {
    if (!Array.isArray(data)) return [];
    return data.map((g) => ({
      ...g,
      id: g?.id ?? '',
      date: g?.date ?? '',
      time: g?.time ?? '',
      lineup: (g?.lineup as I18nString) ?? { fi: '', en: '' },
      venue: g?.venue ?? '',
      city: g?.city ?? '',
      notes: {
        fi: g?.notes?.fi ?? '',
        en: g?.notes?.en ?? '',
      },
    }));
  };

  return (
    <div id={sectionIds.gigs} className={styles.gigs}>
      <h2 className={styles.gigsTitle}>{title}</h2>
      <div className={styles.gigsCardContainer}>
        <GigsTable data={normalizeGigs(gigsData as Partial<Gig>[])} />
      </div>
    </div>
  );
};

export default Gigs;
