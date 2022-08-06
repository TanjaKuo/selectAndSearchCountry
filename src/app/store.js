import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../features/country/countrySlice";
import listReducer from "../features/list/listSlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    list: listReducer,
  },
});
