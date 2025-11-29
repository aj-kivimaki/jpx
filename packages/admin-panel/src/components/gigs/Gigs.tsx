import styles from './Gigs.module.css';
import { gigs } from 'shared';
import GigsTable from './GigsTable';

const Gigs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gigs}>
        <GigsTable data={gigs} />
      </div>
    </div>
  );
};

export default Gigs;
