import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';

export default function NotFoundRedirect() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });
  }, []);

  if (loggedIn === null) return null;

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
