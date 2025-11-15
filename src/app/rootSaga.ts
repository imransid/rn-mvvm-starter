import { all, fork } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import homeSaga from "../features/home/homeSaga";
import quizSaga from "../features/quiz/quizSaga";

export default function* rootSaga() {
  console.log("🚀 rootSaga running");
  yield all([
    fork(authSaga),  
    fork(homeSaga),  
    fork(quizSaga)
  ]);
}
