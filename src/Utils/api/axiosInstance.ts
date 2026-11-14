import axios from 'axios';
import { toApiError } from './apiError';

let authToken: string | null = null;

// Called by the store when the in-memory token changes.
export const setAuthToken = (token: string | null): void => {
  authToken = token;
};

const baseURL: string | undefined = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  // Without it Axios sends requests to this app's own origin and every call fails with a 404.
  console.error(
    'VITE_API_BASE_URL is not set. Copy .env.example to .env and restart the dev server.',
  );
}

const axiosInstance = axios.create({
  baseURL,
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
