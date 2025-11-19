import Form from './components/form/Form';
import styles from './App.module.css';
import Gigs from './components/gigs/Gigs';
import './styles/reset.css';
import './styles/global.css';

function App() {
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
}

export default App;
