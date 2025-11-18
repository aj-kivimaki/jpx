import styles from './GigsDisplay.module.css';
import data from '../../gigs.json';
import GigsTable from './GigsTable';

const GigsDisplay = () => {
  return (
    <div className={styles.display}>
      <div className={styles.gigs}>
        <GigsTable data={data} />
      </div>
    </div>
  );
};

export default GigsDisplay;
