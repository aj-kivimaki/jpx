import { supabase } from '../../clients/supabaseClient';
import { FcGoogle } from 'react-icons/fc';
import styles from './LoginWithGoogleButton.module.css';

export default function LoginWithGoogleButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error(error);
  };

  return (
    <div className={styles.googleLogin}>
      <button onClick={handleLogin}>
        <FcGoogle className={styles.googleIcon} />
      </button>
    </div>
  );
}
