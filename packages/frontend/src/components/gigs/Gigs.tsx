import GigsTable from './GigsTable';
import data from 'shared/data/gigs.json';
import styles from './Gigs.module.css';
import { sections } from 'shared/data/site.json';
import { sectionIds } from 'shared/config/sectionIds';

const Gigs = () => {
  return (
    <div id={sectionIds.gigs} className={styles.gigs}>
      <h2 className={styles.gigsTitle}>{sections.gigs.title}</h2>
      <div className={styles.gigsCardContainer}>
        <GigsTable data={data} />
      </div>
    </div>
  );
};

export default Gigs;
