import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../Redux/hooks";
import { selectIsAuthenticated } from "../Redux/slices/authSlice";
import { AppRoute } from "../types/Enums/AppRoute";

const allowedRedirects: string[] = [
  AppRoute.Dashboard,
  AppRoute.Products,
  AppRoute.Users,
  AppRoute.Settings,
];

const PublicRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  const state: unknown = location.state;

  let redirectTo: string = AppRoute.Dashboard;

  if (
    typeof state === "object" &&
    state !== null &&
    "from" in state &&
    typeof state.from === "string"
  ) {
    const requestedPath = state.from.split(/[?#]/, 1)[0];

    if (allowedRedirects.includes(requestedPath)) {
      redirectTo = state.from;
    }
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
