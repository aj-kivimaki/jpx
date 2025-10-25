import type { Key } from 'react';
// import useFetch from '../hooks/useFetch.ts';
import data from '../gigs.json';

interface Gig {
  date: string;
  lineup: string;
  venue: string;
  city?: string;
  description?: string;
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
      <table className="gigs-table">
        <tbody>
          {data &&
            data.map((gig: Gig, index: Key | null | undefined) => (
              <tr key={index}>
                <td>{gig.date}</td>
                <td>{gig.lineup}</td>
                <td>{gig.venue}</td>
                {gig.city ? <td>{gig.city}</td> : null}
                {gig.description ? <td>{gig.description}</td> : null}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GigsTable;
