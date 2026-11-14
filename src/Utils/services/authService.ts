import axiosInstance from '../api/axiosInstance';
import { ApiError } from '../api/apiError';
import { ApiErrorCode } from '../../types/Enums/ApiErrorCode';
import type { LoginCredentials, LoginResponse } from '../../types/auth.types';

// FakeStoreAPI answers a successful login with a token only (no user profile).
// A 2xx response without a usable token is treated as a failure rather than trusted.
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<Partial<LoginResponse>>('/auth/login', credentials);
  if (typeof data?.token !== 'string' || data.token.length === 0) {
    throw new ApiError(ApiErrorCode.Unknown);
  }
  return { token: data.token };
};
