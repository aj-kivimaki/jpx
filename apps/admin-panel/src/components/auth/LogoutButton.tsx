import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { logger, signOut } from '@jpx/shared';

import { supabase } from '../../clients';

import styles from './LogoutButton.module.css';

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
      data-cy="logout-button"
    >
      {loading || <MdLogout className={styles.logoutIcon} />}
    </button>
  );
}
