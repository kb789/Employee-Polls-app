import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestionAnswer } from "../_DATA.js";

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
    console.log(data);
    let res = await _saveQuestionAnswer(data).then((value) => {
      return value;
    });
    console.log(res);
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
      console.log(action.payload);
      let allQuestions = [];
      quesKeys.map((quesKey) => {
        return allQuestions.push(action.payload[quesKey]);
      });
      console.log(allQuestions);
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
  },
});

export default allQuestionsSlice.reducer;
