import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/hooks';
import { logout } from '../Redux/slices/authSlice';
import { AppRoute } from '../types/Enums/AppRoute';

// Navigate first, then clear state: both happen in one batched update, so ProtectedRoute
// never gets a chance to redirect with a "return to this page" target after an explicit logout.
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return () => {
    navigate(AppRoute.Login, { replace: true });
    dispatch(logout());
  };
};
