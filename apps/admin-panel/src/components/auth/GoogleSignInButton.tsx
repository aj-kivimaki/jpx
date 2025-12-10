import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { googleSignIn, logger } from '@jpx/shared';
import { Spinner } from '@jpx/ui';
import type { SupabaseClient } from '@supabase/supabase-js';

import styles from './GoogleSignInButton.module.css';

interface GoogleSignInButtonProps {
  client: SupabaseClient;
}

const GoogleSignInButton = ({ client }: GoogleSignInButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await googleSignIn(client);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred.';
      logger.error({ msg: 'Google sign-in failed', err });
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={styles.googleLogin}
      onClick={handleGoogleSignIn}
      disabled={loading}
    >
      <FcGoogle className={styles.googleIcon} />
      {loading && <Spinner />}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </button>
  );
};

export default GoogleSignInButton;
