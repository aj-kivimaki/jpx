import { supabase } from '../../clients/supabaseClient';
import { MdLogout } from 'react-icons/md';
import { signOut } from 'shared';
import styles from './LogoutButton.module.css';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut(supabase);
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      <MdLogout className={styles.logoutIcon} />
    </button>
  );
}
