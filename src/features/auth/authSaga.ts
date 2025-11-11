import { call, put, takeLatest, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/api';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setRefreshTime,
} from './authSlice';
import { saveTokens, getTokens, clearTokens } from '../../utils/secureStorage';
import { SagaIterator } from 'redux-saga';

// -----------------------------
// Helper APIs
// -----------------------------
function loginApi(email: string, password: string) {
  return api.post('/auth/login', { email, password });
}

function refreshApi(refreshToken: string) {
  return api.post('/auth/refresh', { refreshToken });
}

// -----------------------------
// Worker saga
// -----------------------------
function* handleLogin(
  action: PayloadAction<{ email: string; password: string }>,
): SagaIterator {
  try {
    const { email, password } = action.payload;

    // Call login API
    const { data } = yield call(loginApi, email, password);

    const tokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    // Save tokens securely
    yield call(saveTokens, tokens);

    // Optionally fetch profile
    const { data: profile } = yield call(api.get, '/me');

    // Dispatch login success
    yield put(loginSuccess({ user: profile }));
  } catch (err: any) {
    yield put(loginFailure({ error: err?.message || 'Login failed' }));
  }
}

// -----------------------------
// Token refresh flow
// -----------------------------
function* refreshFlow(): SagaIterator<string | null> {
  try {
    const tokens = yield call(getTokens);
    if (!tokens?.refreshToken) {
      yield put(logout());
      return null;
    }

    const { data } = yield call(refreshApi, tokens.refreshToken);
    const newTokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    yield call(saveTokens, newTokens);
    yield put(setRefreshTime());

    return newTokens.accessToken;
  } catch (err) {
    yield call(clearTokens);
    yield put(logout());
    return null;
  }
}

// -----------------------------
// Watcher saga
// -----------------------------
export default function* authSaga(): SagaIterator {
  yield all([takeLatest(loginRequest.type, handleLogin)]);
}
