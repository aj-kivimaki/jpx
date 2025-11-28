import { useEffect, useState, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../config/supabaseClient';

interface PrivateRouteProps {
  children: JSX.Element;
}
export default function PrivateRoute({
  children,
}: Readonly<PrivateRouteProps>) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!loggedIn) return <Navigate to="/login" replace />;

  return children;
}
