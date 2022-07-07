import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAnswered: false,
};

const currAnsweredSlice = createSlice({
  name: "currAnswer",
  initialState,
  reducers: {
    toggleAnswered: (state, action) => {
      state.isAnswered = !state.isAnswered;
    },
  },
});

export const { toggleAnswered } = currAnsweredSlice.actions;

export default currAnsweredSlice.reducer;
