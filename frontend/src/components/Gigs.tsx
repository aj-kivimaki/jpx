import GigsTable from './GigsTable';

const Gigs = () => {
  return (
    <div id="gigs" className="section gigs">
      <div className="gigs-card">
        <h2>Keikat</h2>
        <GigsTable data={null} />
      </div>
    </div>
  );
};

export default Gigs;
