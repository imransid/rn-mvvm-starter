import { all, fork } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";

export default function* rootSaga() {
  console.log("🚀 rootSaga running");
  yield all([fork(authSaga)]);
}
