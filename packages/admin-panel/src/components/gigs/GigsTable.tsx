import { useTranslation } from 'react-i18next';
import { IoTimeOutline } from 'react-icons/io5';
import { GiMicrophone } from 'react-icons/gi';
import { CiCalendar } from 'react-icons/ci';
import { FaBuildingColumns } from 'react-icons/fa6';
import { FaExclamation } from 'react-icons/fa';
import { type GigForm, getLang } from 'shared';
import styles from './GigsTable.module.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { IoIosPin } from 'react-icons/io';

dayjs.extend(customParseFormat);

interface GigsTable {
  data: GigForm[] | null;
}

const GigsTable: React.FC<GigsTable> = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = getLang(i18n);

  if (!data?.length) {
    return <p>{lang === 'fi' ? 'Ei keikkoja tulossa' : 'No gigs scheduled'}</p>;
  }

  return (
    <>
      {data?.map(
        ({
          id,
          date,
          time,
          lineup_fi,
          lineup_en,
          venue,
          city,
          notes_fi,
          notes_en,
        }) => (
          <div key={id} className={styles.card}>
            <div className={styles.leftColumn}>
              {date && (
                <div className={styles.date}>
                  <CiCalendar className={styles.dateIcon} />
                  <span>{dayjs(date).format('DD.MM.')}</span>
                </div>
              )}
              {time && (
                <div className={styles.time}>
                  <IoTimeOutline className={styles.timeIcon} />
                  <span>{dayjs(time, 'HH:mm:ss').format('HH:mm')}</span>
                </div>
              )}
            </div>

            <div className={styles.rightColumn}>
              {lineup_fi && (
                <div className={styles.lineup}>
                  <GiMicrophone className={styles.lineupIcon} />
                  <span>{lang === 'fi' ? lineup_fi : lineup_en}</span>
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
              {notes_fi && (
                <div className={styles.notes}>
                  <FaExclamation className={styles.notesIcon} />
                  <span>{lang === 'fi' ? notes_fi : notes_en}</span>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default GigsTable;
