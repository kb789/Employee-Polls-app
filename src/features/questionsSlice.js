import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from "../_DATA.js";

const initialState = {
  isLoadingTwo: false,
  questions: [],
};

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async (thunkAPI) => {
    let res = await _getQuestions().then((value) => {
      return value;
    });

    return res;
  }
);

export const saveQuestionAnswer = createAsyncThunk(
  "question/updateQuestions",
  async (data, thunkAPI) => {
    let res = await _saveQuestionAnswer(data).then((value) => {
      return value;
    });

    return res;
  }
);

export const saveQuestion = createAsyncThunk(
  "question/addQuestion",
  async (question, thunkAPI) => {
    let res = await _saveQuestion(question).then((value) => {
      return value;
    });

    return res;
  }
);

const allQuestionsSlice = createSlice({
  name: "allQuestions",
  initialState,
  reducers: {},
  extraReducers: {
    [getQuestions.pending]: (state) => {
      state.isLoading = true;
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.isLoading = false;
      const quesKeys = Object.keys(action.payload);

      let allQuestions = [];
      quesKeys.map((quesKey) => {
        return allQuestions.push(action.payload[quesKey]);
      });

      state.questions = allQuestions;
    },
    [getQuestions.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [saveQuestionAnswer.pending]: (state) => {
      console.log("loading");
    },
    [saveQuestionAnswer.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [saveQuestionAnswer.rejected]: (state, action) => {
      console.log(action);
    },

    [saveQuestion.pending]: (state) => {
      console.log("loading");
    },
    [saveQuestion.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [saveQuestion.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default allQuestionsSlice.reducer;
