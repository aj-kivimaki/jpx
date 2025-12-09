import { supabase } from '../../clients';
import { MdLogout } from 'react-icons/md';
import { signOut, logger } from '@jpx/shared';
import styles from './LogoutButton.module.css';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut(supabase);
    } catch (err: unknown) {
      logger.error({ msg: 'Sign out failed', err });
    }
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      <MdLogout className={styles.logoutIcon} />
    </button>
  );
}
