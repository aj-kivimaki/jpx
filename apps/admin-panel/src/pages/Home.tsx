import Form from '../components/form/GigForm';
import Gigs from '../components/gigs/Gigs';

import styles from './Home.module.css';

const Home = () => {
  return (
    <main data-cy="admin-dashboard" className={styles.app}>
      <section className={styles.left}>
        <Form />
      </section>
      <section className={styles.right}>
        <Gigs />
      </section>
    </main>
  );
};

export default Home;
