import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../Redux/hooks';
import { selectIsAuthenticated } from '../Redux/slices/authSlice';
import { AppRoute } from '../types/Enums/AppRoute';
import type { LoginRedirectState } from '../types/routing.types';

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const state: LoginRedirectState = { from: `${location.pathname}${location.search}` };
    return <Navigate to={AppRoute.Login} replace state={state} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
