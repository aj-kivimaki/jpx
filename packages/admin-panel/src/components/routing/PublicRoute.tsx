import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/isLoggedIn';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PrivateRouteProps) => {
  if (isLoggedIn()) return <Navigate to="/" replace />;
  return children;
};

export default PublicRoute;
