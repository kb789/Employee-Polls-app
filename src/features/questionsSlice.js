import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from "../_DATA.js";

const initialState = {
  isLoadingQues: false,
  isLoadingAns: false,
  isLoadingQuestions: false,
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
      state.isLoadingQuestions = true;
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.isLoadingQuestions = false;
      const quesKeys = Object.keys(action.payload);

      let allQuestions = [];
      quesKeys.map((quesKey) => {
        return allQuestions.push(action.payload[quesKey]);
      });

      state.questions = allQuestions;
    },
    [getQuestions.rejected]: (state, action) => {
      state.isLoadingQuestions = false;
    },

    [saveQuestionAnswer.pending]: (state) => {
      state.isLoadingAns = true;
    },
    [saveQuestionAnswer.fulfilled]: (state, action) => {
      state.isLoadingAns = false;
    },
    [saveQuestionAnswer.rejected]: (state, action) => {
      state.isLoadingAns = false;
    },

    [saveQuestion.pending]: (state) => {
      state.isLoadingQues = true;
    },
    [saveQuestion.fulfilled]: (state, action) => {
      state.isLoadingQues = false;
    },
    [saveQuestion.rejected]: (state, action) => {
      state.isLoadingQues = false;
    },
  },
});

export default allQuestionsSlice.reducer;
