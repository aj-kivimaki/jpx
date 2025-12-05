import { IoIosPin } from 'react-icons/io';
import { GiMicrophone } from 'react-icons/gi';
import { CiCalendar } from 'react-icons/ci';
import { FaExclamation, FaRegEdit } from 'react-icons/fa';
import { FaBuildingColumns } from 'react-icons/fa6';
import { IoTimeOutline } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import styles from './GigCard.module.css';

export interface GigCardProps {
  id: string;
  formattedDate?: string;
  formattedTime?: string;
  dateTimeDate?: string;
  dateTimeTime?: string;
  weekdayAbbrev?: string;
  lineup?: string;
  venue?: string;
  city?: string;
  notes?: string;
  onDelete?: (id: string, venue: string, formattedDate: string) => void;
  onEdit?: (id: string) => void;
}

const GigCard = ({
  id,
  formattedDate,
  formattedTime,
  dateTimeDate,
  dateTimeTime,
  weekdayAbbrev,
  lineup,
  venue,
  city,
  notes,
  onDelete,
  onEdit,
}: GigCardProps) => (
  <article key={id} className={styles.card}>
    <div className={styles.leftColumn}>
      {formattedDate && (
        <div className={styles.date}>
          <CiCalendar className={styles.dateIcon} aria-hidden="true" />
          <time dateTime={dateTimeDate}>
            {weekdayAbbrev && (
              <span className={styles.weekday}>{weekdayAbbrev}</span>
            )}
            {formattedDate}
          </time>
        </div>
      )}
      {formattedTime && (
        <div className={styles.time}>
          <IoTimeOutline className={styles.timeIcon} aria-hidden="true" />
          <time dateTime={dateTimeTime}>{formattedTime}</time>
        </div>
      )}
    </div>

    <div className={styles.rightColumn}>
      {lineup && (
        <div className={styles.lineup}>
          <GiMicrophone className={styles.lineupIcon} aria-hidden="true" />
          <span>{lineup}</span>
        </div>
      )}
      {venue && (
        <div className={styles.venue}>
          <FaBuildingColumns className={styles.venueIcon} aria-hidden="true" />
          <span>{venue}</span>
        </div>
      )}
      {city && (
        <div className={styles.city}>
          <IoIosPin className={styles.cityIcon} aria-hidden="true" />
          <span className={styles.cityText}>{city}</span>
        </div>
      )}
      {notes && (
        <div className={styles.notes}>
          <FaExclamation className={styles.notesIcon} aria-hidden="true" />
          <span>{notes}</span>
        </div>
      )}
    </div>

    {onDelete && (
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(id, venue ?? '', formattedDate ?? '')}
        aria-label="Poista keikka"
      >
        <MdDeleteForever className={styles.deleteIcon} />
      </button>
    )}

    {onEdit && (
      <button
        className={styles.editButton}
        onClick={() => onEdit(id)}
        aria-label="Muokkaa keikkaa"
      >
        <FaRegEdit className={styles.editIcon} />
      </button>
    )}
  </article>
);

export default GigCard;
