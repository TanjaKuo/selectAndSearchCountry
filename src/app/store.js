import { configureStore } from "@reduxjs/toolkit";

import { countryReducer } from "../features/country/countrySlice";

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});
