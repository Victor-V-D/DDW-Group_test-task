import { auth } from "@/features/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { book } from "@/features/book/bookSlice";
import searchReducer from "@/features/search/searchReducer";

const rootReducer = combineReducers({
  [auth.name]: auth.reducer,
  [book.name]: book.reducer,
  search: searchReducer,
});

export default rootReducer;