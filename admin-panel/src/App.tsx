import Form from './components/form/Form';
import styles from './App.module.css';
import GigsDisplay from './components/display/GigsDisplay';
import './styles/reset.css';
import './styles/global.css';

function App() {
  return (
    <main className={styles.app}>
      <section className={styles.left}>
        <Form />
      </section>
      <section className={styles.right}>
        <GigsDisplay />
      </section>
    </main>
  );
}

export default App;
