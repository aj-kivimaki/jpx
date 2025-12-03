import { useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { FcGoogle } from 'react-icons/fc';
import { googleSignIn } from 'shared';
import styles from './GoogleSignInButton.module.css';

const GoogleSignInButton = ({ client }: { client: SupabaseClient }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await googleSignIn(client);
      console.log('Signed in successfully');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={styles.googleLogin}
      onClick={handleGoogleSignIn}
      disabled={loading}
    >
      <FcGoogle className={styles.googleIcon} />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </button>
  );
};

export default GoogleSignInButton;
