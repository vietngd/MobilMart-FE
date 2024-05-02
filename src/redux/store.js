import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slides/categorySlice.js";
import userReducer from "./slides/userSlice.js";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    user: userReducer,
  },
});
