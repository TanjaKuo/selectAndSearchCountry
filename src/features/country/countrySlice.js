import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const COUNTRY_URL = "https://restcountries.com/v3.1/all";

export const initialState = {
  //countryName: "",
  countriesInfo: [],
  //   isOpenOptions: false,
  loadingMoreCountries: [],
  isInitialSearch: true,
  isLoading: false,
  error: null,
  filteredCountry: [],
  currentCountryIndexToNumber: -1,
};

// const getIndex = (countryName) => {
//   return countriesInfo.findIndex((country) => country.name === countryName);
// };

// const currentCountryIndexToNumber = parseInt(getIndex(countryName));

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
      const filterCountry = state.countriesInfo.filter((country) =>
        country.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.filteredCountry = filterCountry;
      //   return {
      //     ...state,
      //     filteredCountry,
      //     //   action.payload.length > 0
      //     //     ? filteredCountry
      //     //     : [...state.countriesInfo],
      //   };
    },
    getCurrentCountryIndex: (state, action) => {
      const getIndex = (countryName) => {
        return state.countriesInfo.findIndex(
          (country) => country.name === countryName
        );
      };
      const index = parseInt(getIndex(action.payload));
      state.currentCountryIndexToNumber = index;
    },
    getMoreOptions: (state, action) => {
      const lastCountryOfList = state.countriesInfo[249];
      const secondAboveCurrentCountry =
        state.countriesInfo[state.currentCountryIndexToNumber - 1];
      const firstAboveCurrentCountry =
        state.countriesInfo[state.currentCountryIndexToNumber - 2];
      const firstBehindCurrentCountry =
        state.countriesInfo[state.currentCountryIndexToNumber + 1];
      const secondBehindCurrentCountry =
        state.countriesInfo[state.currentCountryIndexToNumber + 2];
      const unshift = state.filteredCountry.unshift(
        firstAboveCurrentCountry,
        secondAboveCurrentCountry
      );
      const push = state.filteredCountry.push(
        firstBehindCurrentCountry,
        secondBehindCurrentCountry
      );
      console.log("unshift", unshift);
      console.log("push", push);
      //state.loadingMoreCountries = unshift;
      // state.filteredCountry.push(
      //   oneBehindCurrentCountry,
      //   twoBehindCurrentCountry
      // );
      //state.filteredCountry.unshift(action.payload);
      state.loadingMoreCountries = state.filteredCountry;
    },
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
  getMoreOptions,
  getCurrentCountryIndex,
} = countrySlice.actions;

export default countrySlice.reducer;
