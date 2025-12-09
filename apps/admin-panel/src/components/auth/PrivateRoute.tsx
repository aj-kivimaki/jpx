import { useEffect, useState, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../clients';
import { logger } from '@jpx/shared';

interface PrivateRouteProps {
  children: JSX.Element;
}
export default function PrivateRoute({
  children,
}: Readonly<PrivateRouteProps>) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setLoggedIn(!!data.session);
      } catch (err) {
        logger.error({ msg: 'Failed to get session', err });
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!loggedIn) return <Navigate to="/login" replace />;

  return children;
}
