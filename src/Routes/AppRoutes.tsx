import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../Components/Layout/AdminLayout';
import DashboardPage from '../Pages/DashboardPage';
import ProductsPage from '../Pages/ProductsPage';
import UsersPage from '../Pages/UsersPage';
import LoginPage from '../Pages/LoginPage';
import { AppRoute } from '../types/Enums/AppRoute';

// Route protection is added in Phase 4.
const AppRoutes = () => (
  <Routes>
    <Route path={AppRoute.Login} element={<LoginPage />} />
    <Route element={<AdminLayout />}>
      <Route path={AppRoute.Dashboard} element={<DashboardPage />} />
      <Route path={AppRoute.Products} element={<ProductsPage />} />
      <Route path={AppRoute.Users} element={<UsersPage />} />
    </Route>
    <Route path="*" element={<Navigate to={AppRoute.Dashboard} replace />} />
  </Routes>
);

export default AppRoutes;
