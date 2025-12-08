import styles from './Home.module.css';
import Form from '../components/form/GigForm';
import Gigs from '../components/gigs/Gigs';

const Home = () => {
  return (
    <main className={styles.app}>
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
