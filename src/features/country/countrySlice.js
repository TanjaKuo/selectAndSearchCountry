import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const COUNTRY_URL = "https://restcountries.com/v3.1/all";

export const initialState = {
  countryName: "",
  countryNameWithoutFlag: "",
  countriesInfo: [],
  loadingMoreCountries: [],
  isInitialSearch: true,
  isLoading: false,
  error: null,
  filteredCountry: [],
  currentCountryIndexToNumber: -1,
};

export const fetchCountries = createAsyncThunk(
  "country/getCountriesInfo",
  async (name, thunkAPI) => {
    try {
      const datas = await axios(COUNTRY_URL);
      const countriesInfo = datas.data.map((info) => ({
        id: info.name.common,
        name: info.name.common,
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
    getCountryName: (state, action) => {
      state.countryName = action.payload;
    },
    getFilteredCountry: (state, action) => {
      let arr = [];
      const regex = /[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]\s+/;

      if (regex.test(state.countryName)) {
        arr = state.countriesInfo.filter((country) =>
          country.name
            .toLowerCase()
            .includes(state.countryName.slice(7).trimStart().toLowerCase())
        );
      } else {
        arr = state.countriesInfo.filter((country) =>
          country.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
      state.filteredCountry = arr;
    },
    getCurrentCountryIndex: (state, action) => {
      const getIndex = () => {
        return state.countriesInfo.findIndex(
          (country) => country.name === state.countryName.slice(7)
        );
      };
      const index = parseInt(getIndex(action.payload));
      state.currentCountryIndexToNumber = index;
    },
    getMoreOptions: (state, action) => {
      const lastCountryOfList = state.countriesInfo[249];
      const secondLastCountryOfList = state.countriesInfo[248];
      const firstCountryOfList = state.countriesInfo[0];
      const secondCountryOfList = state.countriesInfo[1];
      const firstBehindCurrentCountry =
        state.countriesInfo[state.currentCountryIndexToNumber + 1];
      const secondBehindCurrentCountry =
        state.countriesInfo[state.currentCountryIndexToNumber + 2];
      const twoAboveCurrentCountry =
        state.countriesInfo[state.currentCountryIndexToNumber - 2];
      const oneAboveCurrentCountry =
        state.countriesInfo[state.currentCountryIndexToNumber - 1];

      state.loadingMoreCountries = state.filteredCountry;

      const unshift = (secondBeforeCurrentCountry, firstBeforeCurrentCountry) =>
        state.filteredCountry.unshift(
          secondBeforeCurrentCountry,
          firstBeforeCurrentCountry
        );
      const push = (firstBehibdCurrentCountry, secondBehibdCurrentCountry) =>
        state.filteredCountry.push(
          firstBehibdCurrentCountry,
          secondBehibdCurrentCountry
        );
      if (state.currentCountryIndexToNumber === 0) {
        unshift(secondLastCountryOfList, lastCountryOfList);
        push(firstBehindCurrentCountry, secondBehindCurrentCountry);

        state.loadingMoreCountries = state.filteredCountry;
      } else if (state.currentCountryIndexToNumber === 1) {
        unshift(lastCountryOfList, oneAboveCurrentCountry);
        push(firstBehindCurrentCountry, secondBehindCurrentCountry);

        state.loadingMoreCountries = state.filteredCountry;
      } else if (state.currentCountryIndexToNumber === 249) {
        unshift(twoAboveCurrentCountry, oneAboveCurrentCountry);
        push(firstCountryOfList, secondCountryOfList);

        state.loadingMoreCountries = state.filteredCountry;
      } else if (state.currentCountryIndexToNumber === 248) {
        unshift(twoAboveCurrentCountry, oneAboveCurrentCountry);
        push(firstBehindCurrentCountry, firstCountryOfList);

        state.loadingMoreCountries = state.filteredCountry;
      } else {
        unshift(twoAboveCurrentCountry, oneAboveCurrentCountry);
        push(firstBehindCurrentCountry, secondBehindCurrentCountry);
        state.loadingMoreCountries = state.filteredCountry;
      }
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

export const {
  getCountryName,
  initialSearch,
  notInitialSearch,
  getFilteredCountry,
  getMoreOptions,
  getCurrentCountryIndex,
  getRidOfFlag,
} = countrySlice.actions;

export default countrySlice.reducer;
