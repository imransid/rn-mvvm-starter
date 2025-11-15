import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizResultResponse } from "./quizTypes";

interface Question {
  question_id: number;
  question_text: string;
  question_type: string;
  options: any[];
}

interface QuizSession {
  session_id: string;
  quiz_id: number;
  child_id: number;
  family_id: number;
  // Add other session properties as needed
}

interface QuizState {
  session: QuizSession | null;
  questions: Question | null;
  currentQuestionIndex: number;
  loading: boolean;
  error: string | null;
  result: QuizResultResponse[] 
}

const initialState: QuizState = {
  session: null,
  questions: null,
  currentQuestionIndex: 0,
  loading: false,
  error: null,
  result : []
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {

    getNextQuestionRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    getNextQuestionSuccess: (state, action: PayloadAction<Question>) => {
      state.loading = false;
      state.error = null;
      state.currentQuestionIndex += 1;
      state.questions = action.payload;
    },
    getNextQuestionFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    setSession: (state, action: PayloadAction<QuizSession>) => {
      state.session = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Question>) => {
       state.questions = action.payload;
    },
    nextQuestion: (state, action: PayloadAction<Question[]>) => {
     // if (state.currentQuestionIndex < state.questions.length - 1) {
        // state.currentQuestionIndex += 1;
        //    state.questions = action.payload;
    //  }
    },
    prevQuestion: (state) => {
     // if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      //}
    },
    resetQuiz: (state) => {
      state.session = null;
      state.questions = null;
      state.currentQuestionIndex = 0;
      state.loading = false;
      state.error = null;
    },

    setResult : (state, action: PayloadAction<any>) => {
      state.result = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSession,
  setQuestions,
  nextQuestion,
  prevQuestion,
  resetQuiz,
  setLoading,
  setError,
getNextQuestionRequest,
  getNextQuestionSuccess,
  getNextQuestionFailure,
  setResult
} = quizSlice.actions;

export default quizSlice.reducer;
