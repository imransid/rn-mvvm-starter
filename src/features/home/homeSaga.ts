import { call, put, takeLatest, all, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import {
  createChildRequest,
  createChildSuccess,
  createChildFailure,
} from "./homeSlice";
import { Child } from "./homeTypes";
import { toasts } from "../../assets/lib";
import { SagaIterator } from "redux-saga";



// -----------------------------
// API CALLS
// -----------------------------
function createChildApi(data: any) {
  return api.post("/children/me", data);
}



// -----------------------------
// WORKERS
// -----------------------------
function* handleCreateChild(action: PayloadAction<Child>): SagaIterator {
  try {

    const response = yield call(createChildApi, action.payload);

    
    console.log('ok', response)

    yield put(createChildSuccess(response.data));
    toasts("Child added successfully", "success");
  } catch (err: any) {
    console.error("❌ Create child failed:", err);
    yield put(createChildFailure(err?.response?.data?.detail || "Create child failed"));
    toasts(err?.response?.data?.detail || "Create child failed", "error");
  }
}

// -----------------------------
// WATCHERS
// -----------------------------
export default function* homeSaga(): SagaIterator {
  yield all([
    takeLatest(createChildRequest.type, handleCreateChild),
  ]);
}
