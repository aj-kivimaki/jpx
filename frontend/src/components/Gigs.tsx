import GigsTable from './GigsTable';
import styles from './Gigs.module.css';

const Gigs = () => {
  return (
    <div id="gigs" className={`section ${styles.gigs}`}>
      <div className={styles.gigsCard}>
        <h2>Keikat</h2>
        <GigsTable data={null} />
      </div>
    </div>
  );
};

export default Gigs;
