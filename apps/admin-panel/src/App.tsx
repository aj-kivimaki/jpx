import { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import PrivateRoute from './components/auth/PrivateRoute';
import Login from './pages/Login';
import NotFoundRedirect from './pages/NotFoundRedirect';
import { supabase } from './clients';

const Home = lazy(() => import('./pages/Home'));

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/', { replace: true });
      } else if (event === 'SIGNED_OUT') {
        navigate('/login', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  );
}
