import { useTranslation } from 'react-i18next';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { GiMicrophone } from 'react-icons/gi';
import { CiCalendar } from 'react-icons/ci';
import { FaBuildingColumns } from 'react-icons/fa6';
import { FaExclamation } from 'react-icons/fa';
import { type Gig, type Language } from 'shared/schemas';
import styles from './GigsTable.module.css';

interface GigsTable {
  data: Gig[] | null;
}

const GigsTable: React.FC<GigsTable> = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language as Language;

  if (!data?.length) {
    return <p>{lang === 'fi' ? 'Ei keikkoja tulossa' : 'No gigs scheduled'}</p>;
  }

  return (
    <>
      {data?.map(({ id, date, time, lineup, venue, city, notes }) => (
        <div key={id} className={styles.card}>
          <div className={styles.leftColumn}>
            <div className={styles.date}>
              <div className={styles.dateIcon}>
                <CiCalendar />
              </div>
              <div>{date}</div>
            </div>
            {time && (
              <div className={styles.time}>
                <div className={styles.timeIcon}>
                  <IoTimeOutline />
                </div>
                <div>{time}</div>
              </div>
            )}
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.lineup}>
              <div className={styles.lineupIcon}>
                <GiMicrophone />
              </div>
              <div>{lineup[lang] ?? lineup?.fi}</div>
            </div>
            {venue && (
              <div className={styles.venue}>
                <div className={styles.venueIcon}>
                  <FaBuildingColumns />
                </div>
                <div>{venue}</div>
              </div>
            )}

            {city && (
              <div className={styles.city}>
                <div className={styles.cityIcon}>
                  <IoLocationOutline />
                </div>
                <div className={styles.cityText}>{city}</div>
              </div>
            )}
            {notes?.fi && (
              <div className={styles.notes}>
                <div className={styles.notesIcon}>
                  <FaExclamation />
                </div>
                <div>{notes?.[lang] ?? notes?.fi}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default GigsTable;
