import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers, _saveUser } from "../_DATA.js";

const initialState = {
  currUser: "",
  isLoadingUser: false,
  isLoadingUsers: false,
  isUserSignUp: false,
  users: [],
  currUserQuestions: [],
};

export const getUsers = createAsyncThunk("users/getUsers", async (thunkAPI) => {
  let res = await _getUsers().then((value) => {
    return value;
  });

  return res;
});

export const saveUser = createAsyncThunk(
  "user/saveUser",
  async (user, thunkAPI) => {
    await _saveUser(user);
    let res = await _getUsers().then((value) => {
      return value;
    });

    let response = { newuser: res[user.id], users: res };
    return response;
  }
);
const currUserSlice = createSlice({
  name: "currUser",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.currUser = payload;
    },
    getCurrUser: (state, { payload }) => {
      state.currUser = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    toggleisUserSignUp: (state, action) => {
      state.isUserSignUp = !state.isUserSignUp;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoadingUsers = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoadingUsers = false;

      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoadingUsers = false;
    },

    [saveUser.pending]: (state) => {
      state.isLoadingUser = true;
    },
    [saveUser.fulfilled]: (state, action) => {
      state.isLoadingUser = false;
    },
    [saveUser.rejected]: (state, action) => {
      state.isLoadingUser = false;
    },
  },
});

export const { setUser, toggleisUserSignUp, setUsers } = currUserSlice.actions;

export default currUserSlice.reducer;
