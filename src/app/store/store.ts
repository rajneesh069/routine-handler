import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./slices/toDoSlice"
export const store = configureStore({
  reducer: toDoReducer,
});
