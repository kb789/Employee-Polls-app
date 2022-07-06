import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currPage: "home",
};

const currPageSlice = createSlice({
  name: "currPage",
  initialState,
  reducers: {
    makeHome: (state, action) => {
      state.currPage = "home";
    },
    makeLogin: (state, action) => {
      state.currPage = "login";
    },
    makeLeaderboard: (state, action) => {
      state.currPage = "leaderboard";
    },
    makeAdd: (state, action) => {
      state.currPage = "add";
    },
  },
});

export const { makeHome, makeLogin, makeLeaderboard, makeAdd } =
  currPageSlice.actions;

export default currPageSlice.reducer;
