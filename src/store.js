import { configureStore } from "@reduxjs/toolkit";
import currUserReducer from "./features/currUserSlice";
import currAnsweredReducer from "./features/currAnsweredSlice";

import allQuestionsReducer from "./features/questionsSlice";
export const store = configureStore({
  reducer: {
    currUser: currUserReducer,
    currAnswered: currAnsweredReducer,
    
    questions: allQuestionsReducer,
  },
});
