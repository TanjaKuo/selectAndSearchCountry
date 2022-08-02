import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const COUNTRY_URL = "https://restcountries.com/v3.1/all";

export const initialState = {
  //countryName: "",
  countriesInfo: [],
  //   isOpenOptions: false,
  //loadingMoreCountries: [],
  isInitialSearch: false,
  isLoading: false,
  error: null,
  filteredCountry: [],
};

export const fetchCountries = createAsyncThunk(
  "country/getCountriesInfo",
  // the name here is an arg, it point to the app.js getCartItem('name'), see p1
  // the second thunkAPI, an object containing all of the parameters, see p2
  async (name, thunkAPI) => {
    try {
      const datas = await axios(COUNTRY_URL);
      const countriesInfo = datas.data.map((info) => ({
        id: info.name.common,
        name: info.name.official,
        flag: info.flag,
      }));
      return countriesInfo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    // getCountryName: (state, action) => {
    //   state.countryName = action.payload;
    // },
    getFilteredCountry: (state, action) => {
      //   state.filteredCountry = state.countriesInfo.filter((country) =>
      //     country.name.toLowerCase().includes(action.payload.toLowerCase())
      //   );
      //   const filterCountry = state.countriesInfo.filter((country) =>
      //     country.name.toLowerCase().includes(action.payload.toLowerCase())
      //   );
      //   return { ...state, filteredCountry: filterCountry };
      //console.log("Slice filter", filteredCountry);
      //   return {
      //     ...state,
      //     filteredCountry,
      //     //   action.payload.length > 0
      //     //     ? filteredCountry
      //     //     : [...state.countriesInfo],
      //   };
    },
    // filterCountries: (state, action) => {
    //   state.countriesInfo.map((country) => country.name === state.countryName);
    // },
    // openOptions: (state) => {
    //   state.isOpenOptions = true;
    // },
    // closeOptions: (state) => {
    //   state.isOpenOptions = false;
    // },
    initialSearch: (state) => {
      state.isInitialSearch = true;
    },
    notInitialSearch: (state) => {
      state.isInitialSearch = false;
    },
  },
  extraReducers: {
    [fetchCountries.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCountries.fulfilled]: (state, action) => {
      state.countriesInfo = action.payload;
      state.isLoading = false;
    },
    [fetchCountries.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCountryName,
  //filterCountries,
  //   openOptions,
  //   closeOptions,
  initialSearch,
  notInitialSearch,
  getFilteredCountry,
} = countrySlice.actions;

export default countrySlice.reducer;
