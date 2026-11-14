import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../Redux/hooks';
import { selectIsAuthenticated } from '../Redux/slices/authSlice';
import { AppRoute } from '../types/Enums/AppRoute';
import type { LoginRedirectState } from '../types/routing.types';

// Pages only for signed-out users. Once authenticated (e.g. right after login),
// send the user to the page they originally asked for, or the dashboard.
const PublicRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const from = (location.state as LoginRedirectState | null)?.from;

  if (isAuthenticated) {
    return <Navigate to={from ?? AppRoute.Dashboard} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
