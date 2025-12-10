import { supabase } from '../clients';
import styles from './Login.module.css';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';

export default function Login() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Kirjaudu sisään</h1>
        </div>
        <div className={styles.divider} />
        <div className={styles.buttonContainer}>
          <GoogleSignInButton client={supabase} />
        </div>
      </div>
    </div>
  );
}
