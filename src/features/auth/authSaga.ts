import { call, put, takeLatest, all } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
import { User } from "./authTypes";
import { SagaIterator } from "redux-saga";

// -----------------------------
// Helper APIs
// -----------------------------
function loginApi(email: string, password: string) {
  return api.post("/auth/login", { email, password });
}

function fetchProfileApi(token: string) {
  return api.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// -----------------------------
// Worker
// -----------------------------
function* handleLogin(action: PayloadAction<{ email: string; password: string }>): SagaIterator {
  try {
    console.log("💡 Saga triggered", action.payload);

    // 1️⃣ Call login API
    const response = yield call(loginApi, action.payload.email, action.payload.password);
    console.log("Login response:", response.data);

    const { access_token }: { access_token: string } = response.data;

    if (!access_token) {
      throw new Error("No access token returned from login");
    }

    // 2️⃣ Call profile API with token
    const profileResponse = yield call(fetchProfileApi, access_token);
    const user: User = profileResponse.data;

    console.log("Profile fetched:", user);

    // 3️⃣ Dispatch login success
    yield put(loginSuccess({ user, access_token }));
  } catch (err: any) {
    console.error("Login failed in saga:", err.message);
    yield put(loginFailure({ error: err?.message || "Login failed" }));
  }
}

// -----------------------------
// Watcher
// -----------------------------
export default function* authSaga(): SagaIterator {
  console.log("👀 authSaga running");
  yield all([takeLatest(loginRequest.type, handleLogin)]);
}
