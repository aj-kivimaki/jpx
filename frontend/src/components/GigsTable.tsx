import gigs from '../gigs.json'; // relative path to your JSON file

function GigsTable() {
  return (
    <div style={{ padding: '10px', fontFamily: 'Arial' }}>
      <h2>Tulevat keikat</h2>
      <table className="gigs-table">
        <tbody>
          {gigs.map((gig, index) => (
            <tr key={index}>
              <td>{gig.date}</td>
              <td>{gig.lineup}</td>
              <td>{gig.venue}</td>
              <td>{gig.city}</td>
              <td>{gig.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GigsTable;
