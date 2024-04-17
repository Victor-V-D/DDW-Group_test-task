import { auth } from "@/features/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { book } from "@/features/book/bookSlice";

const rootReducer = combineReducers({
  [auth.name]: auth.reducer,
  [book.name]: book.reducer,
});

export default rootReducer;