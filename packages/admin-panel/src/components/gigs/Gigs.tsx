import styles from './Gigs.module.css';
import data from 'shared/data/gigs.json';
import GigsTable from './GigsTable';
import type { Gig } from 'shared/types/gig-type';

interface I18nString {
  fi: string;
  en: string;
}

const Gigs = () => {
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
    <div className={styles.container}>
      <div className={styles.gigs}>
        <GigsTable data={normalizeGigs(data as Partial<Gig>[])} />
      </div>
    </div>
  );
};

export default Gigs;
