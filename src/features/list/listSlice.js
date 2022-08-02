import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isOpenOptions: false,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    openOptions: (state) => {
      state.isOpenOptions = true;
    },
    closeOptions: (state) => {
      state.isOpenOptions = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openOptions, closeOptions } = listSlice.actions;

export default listSlice.reducer;
