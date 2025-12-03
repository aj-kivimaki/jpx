import { useState } from 'react';
import { supabase } from '../clients/supabaseClient';
import styles from './Login.module.css';
import { sendMagicLink } from 'shared';
import { useMutation } from '@tanstack/react-query';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const sendLoginLinkMutation = useMutation({
    mutationFn: (email: string) => sendMagicLink(supabase, email),
    onSuccess: () => console.log('Magic link sent!'),
    onError: (error) => console.error(error),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');

    sendLoginLinkMutation.mutate(email);
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>Kirjaudu sisään</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className={styles.input}
            placeholder="Anna sähköpostiosoite"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className={styles.button}>
            Lähetä linkki
          </button>
        </form>

        <div className={styles.orText}>
          <p>Tai kirjaudu Googlella</p>
        </div>

        <GoogleSignInButton client={supabase} />

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
