import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/hooks";
import { logout } from "../Redux/slices/authSlice";
import { AppRoute } from "../types/Enums/AppRoute";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return () => {
    navigate(AppRoute.Login, { replace: true });
    dispatch(logout());
  };
};
