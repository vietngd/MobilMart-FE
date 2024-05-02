import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      return action?.payload;
    },
  },
});

export const { updateCategory } = categorySlice.actions;

export default categorySlice.reducer;
