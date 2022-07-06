import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAnswered: false,
};

const currAnsweredSlice = createSlice({
  name: 'currAnswer',
  initialState,
  reducers: {
    makeAnswered: (state, action) => {
      state.isAnswered = true;
    },
    makeUnanswered: (state, action) => {
      state.isAnswered = false;
    },
  },
});

export const { makeAnswered, makeUnanswered } = currAnsweredSlice.actions;

export default currAnsweredSlice.reducer;