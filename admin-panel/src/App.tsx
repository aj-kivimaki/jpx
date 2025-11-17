import Form from './components/Form';
import styles from './App.module.css';
import Display from './components/Display';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.left}>
        <Form />
      </div>
      <div className={styles.right}>
        <Display />
      </div>
    </div>
  );
}

export default App;
