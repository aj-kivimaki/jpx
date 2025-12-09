import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../clients';
import { logger } from '@jpx/shared';

export default function NotFoundRedirect() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setLoggedIn(!!data.session);
      } catch (err) {
        // Log and treat as not logged in
        logger.error({ msg: 'Failed to get session', err });
        setLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  if (loggedIn === null) return null;

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
