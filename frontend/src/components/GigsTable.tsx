import data from '../gigs.json';
import styles from './GigsTable.module.css';

interface Gig {
  id: string;
  date: string;
  lineup: string;
  venue: string;
  city?: string;
  description?: string;
  time?: string;
}

interface GigsTable {
  data: Gig[] | null;
}

const GigsTable: React.FC<GigsTable> = () => {
  /*  const { data, loading, error } = useFetch(
    'https://artificial-duck-jpx-589d39ef.koyeb.app/api/gigs',
    {
      withCredentials: true,
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; */

  return (
    <div>
      <table className={styles.gigsTable}>
        <tbody>
          {data?.map((gig: Gig) => (
            <tr key={gig.id}>
              <td className={styles.gigsDateCell}>
                {gig.date} {gig.time && <span>{gig.time}</span>}
              </td>

              <td className={styles.gigsLineupCell}>{gig.lineup}</td>
              <td>{gig.venue}</td>
              {gig.city ? (
                <td className={styles.gigsCityCell}>{gig.city}</td>
              ) : null}
              {gig.description ? <td>{gig.description}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GigsTable;
