import { supabase } from '../../config/supabaseClient';
import { signOut } from 'shared';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut(supabase);
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        fontSize: '0.8rem',
        padding: '6px',
        background: '#eee',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        color: 'black',
      }}
    >
      KIRJAUDU ULOS
    </button>
  );
}
