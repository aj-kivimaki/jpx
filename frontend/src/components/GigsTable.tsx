import gigs from '../gigs.json'; // relative path to your JSON file

function GigsTable() {
  return (
    <div>
      <table className="gigs-table">
        <tbody>
          {gigs.map((gig, index) => (
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
}

export default GigsTable;
