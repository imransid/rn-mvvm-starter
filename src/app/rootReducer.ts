import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import homeReducer from '../features/home/homeSlice'
import quizReducer from "../features/quiz/quizSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  quiz: quizReducer
  // add other reducers here
});

export default rootReducer;
