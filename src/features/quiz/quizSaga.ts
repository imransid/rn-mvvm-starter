import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import {
  getNextQuestionRequest,
  getNextQuestionSuccess,
  getNextQuestionFailure,
  resetQuiz,
  setResult,
} from "./quizSlice";
import { RootState } from "../../app/store";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";


export interface Question {
  question_id: number;
  question_text: string;
  question_type: string;
  options: any[];
}

// Worker saga: fetch next question
function* fetchNextQuestionSaga(action: PayloadAction<{ data : any}>): SagaIterator  {
  try {
    const state: RootState = yield select();
    const token = state.root.auth.access_token;
    const session_id = state.root.quiz.session?.session_id;

    const question_id = action.payload?.question_id
    const response_value = action.payload.response_value
    const navigation = action.payload.navigation

    if (!session_id) throw new Error("Session not found");

    const response: { data: any } = yield call(
      axios.post,
      `https://api.zenfamy.ai/api/v1/quizzes/sessions/${session_id}/answer`,{ question_id, response_value },
      {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
      }
    );

    if(response.data){


    if(response.data?.next_question === null){


const response: { data: any } = yield call(
  axios.post,
  `https://api.zenfamy.ai/api/v1/quizzes/sessions/${session_id}/complete`,
  {}, // ✔ empty body
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }
);


let demoData = {
  session_id: session_id,
  results: response.data.results

};

    console.log("response LKJ", demoData)



        yield put(setResult(demoData))
     
        yield put(resetQuiz());
        navigation.navigate("QuizResult")
    }

  
  const _response: { data: any } = yield call(
      axios.get,
      `https://api.zenfamy.ai/api/v1/quizzes/sessions/${session_id}/next-question`,
      {
     headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${token}`,
        },
      }
    );


    console.log("Next Question: _response LL", _response.data.question_id);

    if (_response.data) {
       yield put(getNextQuestionSuccess(_response.data));
    } else {
      yield put(getNextQuestionFailure("No next question available"));
    }

    }

    
  } catch (error: any) {
    yield put(getNextQuestionFailure(error.message || "Failed to fetch next question"));
  }
}

// Watcher saga
export default function* quizSaga() {
  yield takeLatest(getNextQuestionRequest.type, fetchNextQuestionSaga);
}
