import { lazy, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { supabase } from './clients';
import Login from './pages/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import NotFoundRedirect from './pages/NotFoundRedirect';
import '@jpx/shared/styles/reset.css';
import '@jpx/shared/styles/global.css';

const Home = lazy(() => import('./pages/Home'));

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/', { replace: true });
      }
      if (event === 'SIGNED_OUT') {
        navigate('/login', { replace: true });
      }
    });

    return () => subscription?.subscription.unsubscribe();
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
