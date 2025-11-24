import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/isLoggedIn';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const loggedIn = isLoggedIn();
  return loggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
