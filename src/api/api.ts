import axios from 'axios';
import { store } from '../app/store';
import { getTokens, saveTokens, clearTokens } from '../utils/secureStorage';
import { eventChannel, END } from 'redux-saga';
import { logout } from '../features/auth/authSlice';

// simple axios instance
const api = axios.create({
 baseURL: 'https://api.zenfamy.ai/api/v1',
  timeout: 15000,
});

// attach access token before requests
api.interceptors.request.use(async config => {
  const tokens = await getTokens();
  if (tokens?.accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

// response interceptor: on 401, emit custom error for saga to handle
api.interceptors.response.use(
  res => res,
  async error => {
    // Let saga handle refresh flow. We just surface 401 to sagas if needed.
    const status = error?.response?.status;

    if (status === 401) {
      // Optionally throw a specific error shape
      return Promise.reject({ ...error, __isAuthError: true });
    }
    return Promise.reject(error);
  },
);

export default api;
