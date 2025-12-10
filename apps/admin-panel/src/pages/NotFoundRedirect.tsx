import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logger } from '@jpx/shared';

import { supabase } from '../clients';

export default function NotFoundRedirect() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setLoggedIn(!!data.session);
      })
      .catch((err) => {
        logger.error({ msg: 'Failed to get session', err });
        setLoggedIn(false);
      });
  }, []);

  if (loggedIn === null) return null;

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
