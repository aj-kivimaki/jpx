import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { supabase } from './config/supabaseClient';
import Login from './pages/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import Home from './pages/Home';
import 'shared/src/styles/reset.css';
import 'shared/src/styles/global.css';
import NotFoundRedirect from './pages/NotFoundRedirect';

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
