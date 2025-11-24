import { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Kirjautumislinkki on lähetetty sähköpostiisi.');
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>Kirjaudu</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className={styles.input}
            placeholder="Sähköpostiosoite"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className={styles.button}>
            Lähetä linkki
          </button>
        </form>

        {errorMsg && (
          <div className={styles.errorContainer}>
            <div className={styles.error}>{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className={styles.successContainer}>
            <div className={styles.success}>{successMsg}</div>
          </div>
        )}
      </div>
    </div>
  );
}
