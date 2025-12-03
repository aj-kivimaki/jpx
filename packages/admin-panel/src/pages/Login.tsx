import { supabase } from '../clients/supabaseClient';
import styles from './Login.module.css';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';

export default function Login() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>Kirjaudu sisään</h1>
        <div className={styles.divider}></div>
        <GoogleSignInButton client={supabase} />
      </div>
    </div>
  );
}
