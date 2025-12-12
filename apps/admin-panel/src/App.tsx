import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './components/auth';
import Login from './pages/Login';
import NotFoundRedirect from './pages/NotFoundRedirect';
import { useAuthRedirect } from './hooks';

const Home = lazy(() => import('./pages/Home'));

export default function App() {
  useAuthRedirect();

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
