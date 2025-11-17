import data from '../gigs.json';
import styles from './GigsTable.module.css';
import { IoLocationOutline } from 'react-icons/io5';
import { GiMicrophone } from 'react-icons/gi';
import { CiCalendar } from 'react-icons/ci';
import { FaBuildingColumns } from 'react-icons/fa6';
import { FaExclamation } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';

interface Gig {
  id: string;
  date: string;
  lineup: string;
  venue?: string;
  city?: string;
  description?: string;
  time?: string;
}

interface GigsTable {
  data: Gig[] | null;
}

const GigsTable: React.FC<GigsTable> = () => {
  return (
    <>
      {data?.map((gig: Gig) => (
        <div key={gig.id} className={styles.card}>
          <div className={styles.leftColumn}>
            <div className={styles.date}>
              <div className={styles.dateIcon}>
                <CiCalendar />
              </div>
              <div>{gig.date}</div>
            </div>
            {gig.time && (
              <div className={styles.time}>
                <div className={styles.timeIcon}>
                  <IoTimeOutline />
                </div>
                <div>{gig.time}</div>
              </div>
            )}
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.lineup}>
              <div className={styles.lineupIcon}>
                <GiMicrophone />
              </div>
              <div>{gig.lineup}</div>
            </div>
            {gig.venue && (
              <div className={styles.venue}>
                <div className={styles.venueIcon}>
                  <FaBuildingColumns />
                </div>
                <div>{gig.venue}</div>
              </div>
            )}

            {gig?.city && (
              <div className={styles.city}>
                <div className={styles.cityIcon}>
                  <IoLocationOutline />
                </div>
                <div className={styles.cityText}>{gig.city}</div>
              </div>
            )}
            {gig?.description && (
              <div className={styles.description}>
                <div className={styles.descriptionIcon}>
                  <FaExclamation />
                </div>
                <div>{gig?.description}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default GigsTable;
