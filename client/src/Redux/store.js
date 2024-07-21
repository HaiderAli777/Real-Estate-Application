import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./Slice/UserSlice";
export const store = configureStore({
  reducer: {
    user: useReducer,
  },
});
