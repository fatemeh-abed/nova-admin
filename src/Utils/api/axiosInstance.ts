import axios from 'axios';
import { toApiError } from './apiError';

let authToken: string | null = null;

// Called by the store when the in-memory token changes.
export const setAuthToken = (token: string | null): void => {
  authToken = token;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.set('Authorization', `Bearer ${authToken}`);
  }
  return config;
});

// Every failed request surfaces as a normalized ApiError.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(toApiError(error)),
);

export default axiosInstance;
