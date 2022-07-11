import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../_DATA.js";

const initialState = {
  currUser: "",
  isLoading: false,
  users: [],
  currUserQuestions: [],
 
  
};

export const getUsers = createAsyncThunk("users/getUsers", async (thunkAPI) => {
  let res = await _getUsers().then((value) => {
    return value;
  });

  return res;
});

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
    
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);
export const { setUser } = currUserSlice.actions;

export default currUserSlice.reducer;
