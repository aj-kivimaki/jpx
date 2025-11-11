import GigsTable from './GigsTable';
import styles from './Gigs.module.css';

const Gigs = () => {
  return (
    <div id="gigs" className={styles.gigs}>
      <h2 className={styles.gigsTitle}>KEIKAT</h2>
      <div className={styles.gigsCard}>
        <GigsTable data={null} />
      </div>
    </div>
  );
};

export default Gigs;
