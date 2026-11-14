import type { AuthStatus } from './Enums/AuthStatus';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthState {
  status: AuthStatus;
  token: string | null; // kept in memory only, never persisted
  username: string | null;
  error: string | null;
}
