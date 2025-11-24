import styles from './Gigs.module.css';
import data from 'shared/gigs.json';
import GigsTable from './GigsTable';

const Gigs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gigs}>
        <GigsTable data={data} />
      </div>
    </div>
  );
};

export default Gigs;
