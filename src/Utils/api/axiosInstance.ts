import axios from "axios";
import { toApiError } from "./apiError";

let authToken: string | null = null;

export const setAuthToken = (token: string | null): void => {
  authToken = token;
};

const baseURL: string | undefined = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  console.error(
    "VITE_API_BASE_URL is not set. " +
      "Copy .env.example to .env and restart the dev server.",
  );
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.set("Authorization", `Bearer ${authToken}`);
  } else {
    config.headers.delete("Authorization");
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(toApiError(error)),
);

export default axiosInstance;
