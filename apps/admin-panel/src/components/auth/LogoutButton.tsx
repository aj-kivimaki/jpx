import { useState } from 'react';
import { supabase } from '../../clients';
import { MdLogout } from 'react-icons/md';
import { signOut, logger } from '@jpx/shared';
import styles from './LogoutButton.module.css';
import { Spinner } from '@jpx/ui';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(supabase);
    } catch (err: unknown) {
      logger.error({ msg: 'Sign out failed', err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={styles.logoutButton}
      onClick={handleLogout}
      disabled={loading}
      aria-label="Log out"
    >
      {loading ? <Spinner /> : <MdLogout className={styles.logoutIcon} />}
    </button>
  );
}
