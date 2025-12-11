import { CiCalendar } from 'react-icons/ci';
import { FaExclamation, FaRegEdit } from 'react-icons/fa';
import { FaBuildingColumns } from 'react-icons/fa6';
import { GiMicrophone } from 'react-icons/gi';
import { IoIosPin } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

import styles from './GigCard.module.css';
import { RenderField } from './RenderField';

export interface GigCardProps {
  id: string;
  formattedDate: string;
  formattedTime?: string;
  dateTimeDate: string;
  dateTimeTime?: string;
  weekdayAbbrev: string;
  lineup: string;
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
  <article data-cy="item" className={styles.card}>
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
      <RenderField
        icon={<GiMicrophone className={styles.lineupIcon} aria-hidden="true" />}
        content={lineup}
        className={styles.lineup}
      />
      <RenderField
        icon={
          <FaBuildingColumns className={styles.venueIcon} aria-hidden="true" />
        }
        content={venue}
        className={styles.venue}
      />
      <RenderField
        icon={<IoIosPin className={styles.cityIcon} aria-hidden="true" />}
        content={city}
        className={styles.city}
      />
      <RenderField
        icon={<FaExclamation className={styles.notesIcon} aria-hidden="true" />}
        content={notes}
        className={styles.notes}
      />
    </div>

    {onDelete && (
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(id, venue ?? '', formattedDate)}
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
