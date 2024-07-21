import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";

const initialState = {
  error: "",
  loading: false,
  userdata: {},
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEror: (state, action) => {
      state.error = action.payload;
    },
    emptyEror: (state) => {
      state.error = "";
    },
    setloading: (state, action) => {
      state.loading = !state.loading;
    },
    insertingData: (state, action) => {
      state.userdata = action.payload;
    },
    removeData: (state) => {
      state.userdata = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEror, emptyEror, setloading, insertingData, removeData } =
  UserSlice.actions;

export default UserSlice.reducer;
