import "./App.css";
import React, { useEffect, useId, useState } from "react";
//import axios from "axios";
import List from "./components/List";
import SelectCountryList from "./components/SelectCountryList";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCountries,
  getCountryName,
  //openOptions,
  //closeOptions,
  getFilteredCountry,
  getMoreOptions,
  initialSearch,
  notInitialSearch,
  getCurrentCountryIndex,
} from "./features/country/countrySlice";

import { openOptions } from "./features/list/listSlice";

function App() {
  //const [countryName, setCountryName] = useState("");
  //const [loadingMoreCountries, setLoadingMoreCountries] = useState([]);
  //const [countriesInfo, setCountriesInfo] = useState([]);
  //console.log("countryInfo", countryInfo);
  //const [openOptions, setOpenOptions] = useState(false);
  //const [isInputValueExisting, setIsInputValueExisting] = useState(false);
  //console.log("loadingMore--@@@@@@", loadingMoreCountries);
  //const [searchCountry, setSearchCountry] = useState("");
  //const [initalSearch, setInitalSearch] = useState(false);

  const {
    isLoading,
    error,
    countriesInfo,
    countryName,
    //isOpenOptions,
    loadingMoreCountries,
    isInitialSearch,
    filteredCountry,
    currentCountryIndexToNumber,
    countryNameWithoutFlag,
  } = useSelector((state) => state.country);
  console.log("~~~~~~~~~~~~~~`home countryName", countryName);
  console.log("~~~~~~~~~~~~~~`home countryName", countryName.split(""));
  console.log("~~~~~~~~~~~~~~`home countryName", countryName.slice(4));
  console.log(
    "~~~~~~~~~~~~~~`home countryNameWithoutFlag,",
    countryNameWithoutFlag
  );
  // console.log("app loaidng", isLoading);
  // console.log("app err, ", error);
  // //console.log("app countriesInfo,", countriesInfo);
  // console.log("app  countryName", countryName);
  // console.log("appoadingMoreCountries, ", loadingMoreCountries);
  // console.log("app ,initalSearch, ", isInitialSearch);
  console.log("app FILTEr", filteredCountry);
  // console.log("app  countryIndex", currentCountryIndexToNumber);

  const { isOpenOptions } = useSelector((state) => state.list);
  //console.log("app isOpenOptions ", isOpenOptions);
  const dispatch = useDispatch();
  // const id = useId();
  // const COUNTRY_URL = "https://restcountries.com/v3.1/all";

  // get index of country

  // const getIndex = (countriesInfo,countryName) => {
  //   return countriesInfo.findIndex((country) => country.name === countryName);
  // };
  //console.log("index", getIndex);

  //const currentCountryIndexToNumber = parseInt(getIndex(countryName));

  // console.log(
  //   "currentCountryIndexToNumber number only",
  //   currentCountryIndexToNumber
  // );

  // const filterCountries = countriesInfo.filter((country) => {
  //   return country.name
  //     .toLocaleLowerCase()
  //     .includes(countryName.toLocaleLowerCase());
  // });
  // console.log("APP FILTEr", filterCountries);

  const checkCountryExisting = countriesInfo.map(
    (country) => country.name === countryName
  );
  //console.log("check--------", checkCountryExisting);

  // const unshiftToCountryLoadingMore = (countryA, countryB) => {
  //   return filterCountry.unshift(countryA, countryB);
  // };

  // const pushToCountryLoadingMore = (countryA, countryB) => {
  //   return filterCountry.unshift(countryA, countryB);
  // };

  const handleClick = (e) => {
    e.target.placeholder = "Search";
    dispatch(openOptions());
    dispatch(initialSearch());
    dispatch(getFilteredCountry(countryName));
    dispatch(getCurrentCountryIndex(countryName));

    if (currentCountryIndexToNumber === 0 && 1 && 248 && 249) {
      dispatch(notInitialSearch());
    }

    if (countryName && checkCountryExisting && !undefined) {
      dispatch(getMoreOptions(filteredCountry));
      dispatch(notInitialSearch());
      console.log(
        `Yes, there a ${countryName} country name here??`,
        filteredCountry
      );
    }
    // if (countryName === "") {
    //   //dispatch(initialSearch());
    //   dispatch(getFilteredCountry(countryName));
    //   //dispatch(getFilteredCountry(filteredCountry));
    //   //setIsInputValueExisting(false);
    //   //setLoadingMore(filterCountry);
    //   console.log("check only");
    // }
  };

  const handleSearchCountryName = (e) => {
    dispatch(getCountryName(e.target.value));
    //setCountryName(e.target.value);
  };

  // manuel typing changing
  useEffect(() => {
    dispatch(getFilteredCountry(countryName));
  }, [countryName, dispatch]);

  // const handleSearchCountryName = (e) => {
  //   dispatch(getCountryName(e.target.value));
  //   //setCountryName(e.target.value);
  // };

  // useEffect(() => {
  //   const getCountryData = async () => {
  //     const response = await axios.get(COUNTRY_URL);
  //     const datas = response.data;
  //     const eachCountryInfo = datas.map((data) => ({
  //       id: id + data.name.official,
  //       name: data.name.official,
  //       flag: data.flag,
  //     }));
  //     setCountriesInfo(eachCountryInfo);
  //   };
  //   getCountryData();
  // }, [id]);

  useEffect(() => {
    dispatch(fetchCountries("name"));
  }, []);

  if (error) {
    return (
      <div className="loading">
        <h1>Something went wrong </h1>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="App">
          <h1>Loading ... </h1>
        </div>
      ) : (
        <div className="App">
          <input
            type="text"
            placeholder="Select"
            onChange={handleSearchCountryName}
            onClick={handleClick}
            className="inputContainer"
            value={countryName || ""}
          />
          <small className="arrowDown">▼</small>
          {isOpenOptions && (
            <div className="optionContainer">
              <ul
                className="ulOption"
                style={{ overflow: isInitialSearch ? "scroll" : "none" }}
              >
                {loadingMoreCountries && loadingMoreCountries.length > 1
                  ? loadingMoreCountries?.map((country) => (
                      <SelectCountryList
                        key={country.id}
                        country={country}
                        loadingMore={loadingMoreCountries}
                        //countryName={countryName}
                        //setCountryName={setCountryName}
                        // setOpenOptions={setOpenOptions}
                        //openOptions={openOptions}
                        checkCountryExisting={checkCountryExisting}
                      />
                    ))
                  : filteredCountry?.map((country) => (
                      <List
                        country={country}
                        key={country?.id}
                        //setCountryName={setCountryName}
                        // setOpenOptions={setOpenOptions}
                        //openOptions={openOptions}
                        checkCountryExisting={checkCountryExisting}
                        //loadingMore={loadingMoreCountries}
                      />
                    ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
