import axiosInstance from '../api/axiosInstance';
import type { LoginCredentials, LoginResponse } from '../../types/auth.types';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
  return data;
};
