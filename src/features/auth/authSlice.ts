import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authTypes';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string | null;
  lastRefreshedAt?: number | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  lastRefreshedAt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User }>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.lastRefreshedAt = null;
    },
    restoreSession(state, action: PayloadAction<{ user: User | null }>) {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
    },
    setRefreshTime(state) {
      state.lastRefreshedAt = Date.now();
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  restoreSession,
  setRefreshTime,
} = authSlice.actions;

export default authSlice.reducer;
