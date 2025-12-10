import { type JSX, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logger } from '@jpx/shared';
import { Spinner } from '@jpx/ui';

import { supabase } from '../../clients';

interface PrivateRouteProps {
  children: JSX.Element;
}
export default function PrivateRoute({
  children,
}: Readonly<PrivateRouteProps>) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setLoggedIn(!!data.session))
      .catch((err) => {
        logger.error({ msg: 'Failed to get session', err });
        setLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!loggedIn) return <Navigate to="/login" replace />;

  return children;
}
