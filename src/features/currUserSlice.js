import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers, _saveUser } from "../_DATA.js";

const initialState = {
  currUser: "",
  isLoadingUser: false,
  isLoadingUsers: false,

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
    let res = await _getUsers()
      .then((value) => {
        return value;
      });
   
    console.log(res[user.id]);
    return res[user.id];
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
      state.users=payload;
    }
    
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
      console.log(action);
      state.isLoadingUser = false;
    },
  },
});

// console.log(cartSlice);
export const { setUser } = currUserSlice.actions;

export default currUserSlice.reducer;
