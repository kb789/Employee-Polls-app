import { configureStore } from "@reduxjs/toolkit";
import currUserReducer from "./features/currUserSlice";
import currAnsweredReducer from "./features/currAnsweredSlice";
import currPageReducer from "./features/currPageSlice";
import allQuestionsReducer from "./features/questionsSlice";
export const store = configureStore({
  reducer: {
    currUser: currUserReducer,
    currAnswered: currAnsweredReducer,
    currPage: currPageReducer,
    questions: allQuestionsReducer,
  },
});
