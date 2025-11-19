import Form from './components/form/Form';
import styles from './App.module.css';
import Gigs from './components/gigs/Gigs';
import 'shared/src/styles/reset.css';
import 'shared/src/styles/global.css';

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
