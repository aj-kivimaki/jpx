import { useTranslation } from 'react-i18next';
import { IoIosPin } from 'react-icons/io';
import { GiMicrophone } from 'react-icons/gi';
import { CiCalendar } from 'react-icons/ci';
import { FaExclamation } from 'react-icons/fa';
import { FaBuildingColumns } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import { type Gig, getLang } from 'shared';
import styles from './GigsTable.module.css';

interface GigsTableProps {
  gigs: Gig[];
}

const GigsTable = ({ gigs }: GigsTableProps) => {
  const { i18n } = useTranslation();
  const lang = getLang(i18n);

  return (
    <>
      {gigs.map(({ id, date, time, lineup, venue, city, notes }) => (
        <div key={id} className={styles.card}>
          <div className={styles.leftColumn}>
            {date && (
              <div className={styles.date}>
                <CiCalendar className={styles.dateIcon} />
                <span>{date}</span>
              </div>
            )}
            {time && (
              <div className={styles.time}>
                <IoTimeOutline className={styles.timeIcon} />
                <span>{time}</span>
              </div>
            )}
          </div>

          <div className={styles.rightColumn}>
            {lineup && (
              <div className={styles.lineup}>
                <GiMicrophone className={styles.lineupIcon} />
                <span>{lineup[lang] ?? lineup.fi}</span>
              </div>
            )}
            {venue && (
              <div className={styles.venue}>
                <FaBuildingColumns className={styles.venueIcon} />
                <span>{venue}</span>
              </div>
            )}
            {city && (
              <div className={styles.city}>
                <IoIosPin className={styles.cityIcon} />
                <span className={styles.cityText}>{city}</span>
              </div>
            )}
            {notes?.fi && (
              <div className={styles.notes}>
                <FaExclamation className={styles.notesIcon} />
                <span>{notes[lang] ?? notes.fi}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default GigsTable;
