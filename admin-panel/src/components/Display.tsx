import styles from './Display.module.css';
import data from '../gigs.json';
import GigsTable from './GigsTable';

const Display = () => {
  return (
    <div className={styles.display}>
      <div className={styles.gigs}>
        <GigsTable data={data} />
      </div>
    </div>
  );
};

export default Display;
