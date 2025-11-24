import GigsTable from './GigsTable';
import data from 'shared/gigs.json';
import styles from './Gigs.module.css';

const Gigs = () => {
  return (
    <div id="gigs" className={styles.gigs}>
      <h2 className={styles.gigsTitle}>KEIKAT</h2>
      <div className={styles.gigsCardContainer}>
        <GigsTable data={data} />
      </div>
    </div>
  );
};

export default Gigs;
