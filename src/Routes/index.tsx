import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../Components/Layout/AdminLayout';
import DashboardPage from '../Pages/DashboardPage';
import LoginPage from '../Pages/LoginPage';
import ProductsPage from '../Pages/ProductsPage';
import UsersPage from '../Pages/UsersPage';
import { AppRoute } from '../types/Enums/AppRoute';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Single place where routes and their access rules are declared.
const AppRoutes = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route path={AppRoute.Login} element={<LoginPage />} />
    </Route>
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route path={AppRoute.Dashboard} element={<DashboardPage />} />
        <Route path={AppRoute.Products} element={<ProductsPage />} />
        <Route path={AppRoute.Users} element={<UsersPage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to={AppRoute.Dashboard} replace />} />
  </Routes>
);

export default AppRoutes;
