import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from '../../Utils/services/authService';
import { getErrorMessage } from '../../Utils/api/apiError';
import { AuthStatus } from '../../types/Enums/AuthStatus';
import type { AuthState, LoginCredentials } from '../../types/auth.types';

const initialState: AuthState = {
  status: AuthStatus.Unauthenticated,
  token: null,
  username: null,
  error: null,
};

interface LoginResult {
  token: string;
  username: string;
}

// Credentials are passed to the service only; they are never stored in state.
export const loginThunk = createAsyncThunk<LoginResult, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { token } = await login(credentials);
      return { token, username: credentials.username };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = AuthStatus.Authenticating;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = AuthStatus.Authenticated;
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = AuthStatus.Unauthenticated;
        state.error = action.payload ?? null;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
