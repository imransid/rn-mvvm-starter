import { call, put, takeLatest, all } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure, forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure } from "./authSlice";
import { User } from "./authTypes";
import { SagaIterator } from "redux-saga";
import { saveTokens } from "../../utils/secureStorage";
import { toasts } from "../../assets/lib";
import { NavigationProp } from "@react-navigation/native";
import { forgotPasswordRequestAPI } from "../../api/forgotPassword";


// -----------------------------
// Payload type with navigation
// -----------------------------
interface RegisterPayload {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  avatar_url?: string;
  onboarding_step?: number;
  gender?: string;
  birth_date?: string;
  preferred_language?: string;
  country?: string;
  role?: string;
  navigation?: NavigationProp<any>; // ✅ Add navigation type
}


// -----------------------------
// Payload type with Forgot
// -----------------------------
interface ForgotPasswordPayload {
  email: string;
  navigation?: any; // optional React Navigation object
}

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



export async function registerUserDebug(data: any) {
  const url = "https://api.zenfamy.ai/api/v1/auth/register";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json().catch(() => ({}));
    if(result.detail === "Email is already in use."){
      toasts(result.detail);
       throw new Error(JSON.stringify(result));
    }

    if(result.detail.length === 1){
       toasts(result.detail[0].msg);
        throw new Error(JSON.stringify(result));
    }

    if (!response.ok) {
       toasts("Something went wrong!.. please try again.");
      throw new Error(JSON.stringify(result));
    }
    return result;
  } catch (err: any) {
    console.error("🔥 FETCH ERROR:", err);
    throw err;
  }
}


// -----------------------------
// Worker
// -----------------------------
function* handleLogin(action: PayloadAction<{ email: string; password: string }>): SagaIterator {
  try {
    console.log("💡 Saga triggered", action.payload);

    // 1️⃣ Call login API
    const response = yield call(loginApi, action.payload.email, action.payload.password);
    console.log("Login response: is", response.data);

    const { access_token }: { access_token: string } = response.data;

    if (!access_token) {
      throw new Error("No access token returned from login");
    }
    yield call(saveTokens, { accessToken: access_token, refreshToken: response.data.refresh_token });
    // 2️⃣ Call profile API with token
    const profileResponse = yield call(fetchProfileApi, access_token);
    const user: User = profileResponse.data;
    // 3️⃣ Dispatch login success
    yield put(loginSuccess({ user, access_token }));
  } catch (err: any) {
    console.error("Login failed in saga:", err.message);
    yield put(loginFailure({ error: err?.message || "Login failed" }));
  }
}



// -----------------------------
// Register
// -----------------------------

function* handleRegister(action: PayloadAction<RegisterPayload>): SagaIterator {
  try {

    const response = yield call(registerUserDebug, action.payload);
   if (response) {
      toasts("Check and verify your email to login", "success");
      yield put(registerSuccess());

      // ✅ Navigate only if navigation exists
      if (action.payload.navigation) {
        action.payload.navigation.navigate("Login" as never);
      }
    }

  } catch (err: any) {
    console.error("❌ Register failed in saga:", err.message);
    yield put(registerFailure({ error: err?.message || "Registration failed" }));
  }
}

// -----------------------------
// Forgot Password
// -----------------------------


function* handleForgotPassword(
  action: PayloadAction<ForgotPasswordPayload & { navigation?: any }>
): SagaIterator {
  try {
    const response: any = yield call(forgotPasswordRequestAPI, { email: action.payload.email });

    toasts(response.message || "Check your email to reset password", "success");

    yield put(forgotPasswordSuccess());

    if (action.payload.navigation) {
      action.payload.navigation.navigate("Verify", { email: action.payload.email });
    }
  } catch (err: any) {
    console.error("❌ Forgot password failed:", err);

    yield put(forgotPasswordFailure({ error: err?.detail || "Forgot password failed" }));

    if (err?.detail) {
      if (Array.isArray(err.detail)) {
        err.detail.forEach((e: any) => toasts(e.msg || "Error"));
      } else {
        toasts(err.detail, "error");
      }
    } else {
      toasts("Something went wrong", "error");
    }
  }
}



// -----------------------------
// Watcher
// -----------------------------
export default function* authSaga(): SagaIterator {
  yield all([takeLatest(loginRequest.type, handleLogin)]);
  yield all([takeLatest(registerRequest.type, handleRegister)]);
   yield all([takeLatest(forgotPasswordRequest.type, handleForgotPassword)]);
}
