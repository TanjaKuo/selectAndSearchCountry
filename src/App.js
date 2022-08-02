import "./App.css";
import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import List from "./components/List";
import SelectCountryList from "./components/SelectCountryList";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCountries,
  //getCountryName,
  //filterCountries,
  //openOptions,
  //closeOptions,
  getFilteredCountry,
  initialSearch,
  notInitialSearch,
} from "./features/country/countrySlice";

import { openOptions } from "./features/list/listSlice";

function App() {
  const [countryName, setCountryName] = useState("");
  console.log("~~~~~~~~~~~~~~`home countryName", countryName);
  const [loadingMoreCountries, setLoadingMoreCountries] = useState([]);
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
    //countryName,
    //isOpenOptions,
    //loadingMoreCountries,
    isInitialSearch,
    filteredCountry,
  } = useSelector((state) => state.country);

  console.log("app loaidng", isLoading);
  console.log("app err, ", error);
  console.log("app countriesInfo,", countriesInfo);
  console.log("app  countryName", countryName);
  console.log("appoadingMoreCountries, ", loadingMoreCountries);
  console.log("app ,initalSearch, ", isInitialSearch);
  console.log("APP FILTEr", filteredCountry);

  const { isOpenOptions } = useSelector((state) => state.list);
  console.log("app isOpenOptions ", isOpenOptions);
  const dispatch = useDispatch();
  // const id = useId();
  // const COUNTRY_URL = "https://restcountries.com/v3.1/all";

  // get index of country
  const getIndex = (countryName) => {
    return countriesInfo.findIndex((country) => country.name === countryName);
  };

  const currentCountryIndexToNumber = parseInt(getIndex(countryName));
  // console.log(
  //   "currentCountryIndexToNumber number only",
  //   currentCountryIndexToNumber
  // );

  const filterCountries = countriesInfo.filter((country) => {
    return country.name
      .toLocaleLowerCase()
      .includes(countryName.toLocaleLowerCase());
  });
  console.log("APP FILTEr", filterCountries);
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
    //setOpenOptions(!openOptions);
    dispatch(initialSearch());
    dispatch(getFilteredCountry(countryName));

    //setInitalSearch(true);
    const twoAboveCurrentCountry =
      countriesInfo[currentCountryIndexToNumber - 1];
    //console.log(" inside click nameOnly--1---1--1--", nameOnly);
    const oneAboveCurrentCountry =
      countriesInfo[currentCountryIndexToNumber - 2];
    //console.log(" inside click nameOnly--2---2-2--", nameOnly2);
    const oneBehindCurrentCountry =
      countriesInfo[currentCountryIndexToNumber + 1];
    const twoBehindCurrentCountry =
      countriesInfo[currentCountryIndexToNumber + 2];

    const lastCountryOfList = countriesInfo[249];
    const secondLastCountryOfList = countriesInfo[248];
    const firstCountryOfList = countriesInfo[0];
    const secondCountryOfList = countriesInfo[1];

    //const loadMoreCountryOptions2 = filterCountry.unshift();
    //console.log("UNSHIFT", loadMoreCountryOptions2);

    // if 0 || 1
    if (currentCountryIndexToNumber === 0) {
      //setIsInputValueExisting(false);
      dispatch(notInitialSearch());
      //setInitalSearch(false);
      // unshiftToCountryLoadingMore(secondLastCountryOfList, lastCountryOfList);
      // pushToCountryLoadingMore(
      //   oneBehindCurrentCountry,
      //   twoBehindCurrentCountry
      // );
      // const loadMoreCountryOptions2 = filterCountries.unshift(
      //   secondLastCountryOfList,
      //   lastCountryOfList
      // );
      // const loadMoreCountryOptions = filterCountries.push(
      //   oneBehindCurrentCountry,
      //   twoBehindCurrentCountry
      // );
      // setLoadingMoreCountries(filterCountries);
      // console.log(
      //   `${countryName} country name number is ${currentCountryIndexToNumber}`,
      //   filterCountry
      // );
    }
    if (currentCountryIndexToNumber === 1) {
      //setIsInputValueExisting(false);
      dispatch(notInitialSearch());
      //setInitalSearch(false);
      // unshiftToCountryLoadingMore(lastCountryOfList, twoAboveCurrentCountry);
      // pushToCountryLoadingMore(
      //   oneBehindCurrentCountry,
      //   twoBehindCurrentCountry
      // );
      // const loadMoreCountryOptions2 = filterCountry.unshift(
      //   lastCountryOfList,
      //   twoAboveCurrentCountry
      // );

      // const loadMoreCountryOptions = filterCountry.push(
      //   oneBehindCurrentCountry,
      //   twoBehindCurrentCountry
      // );
      // setLoadingMoreCountries(filterCountry);
      // console.log(
      //   `${countryName} country name number is ${currentCountryIndexToNumber}`,
      //   filterCountry
      // );
    }
    if (currentCountryIndexToNumber === 248) {
      //setIsInputValueExisting(false);
      dispatch(notInitialSearch());
      //setInitalSearch(false);
      // unshiftToCountryLoadingMore(
      //   oneAboveCurrentCountry,
      //   twoAboveCurrentCountry
      // );
      // pushToCountryLoadingMore(oneBehindCurrentCountry, firstCountryOfList);

      // const loadMoreCountryOptions2 = filterCountry.unshift(
      //   oneAboveCurrentCountry,
      //   twoAboveCurrentCountry
      // );
      // const loadMoreCountryOptions = filterCountry.push(
      //   oneBehindCurrentCountry,
      //   firstCountryOfList
      // );
      // setLoadingMoreCountries(filterCountry);
      // console.log(
      //   `${countryName} country name number is ${currentCountryIndexToNumber}`,
      //   filterCountry
      // );
    }
    if (currentCountryIndexToNumber === 249) {
      //setIsInputValueExisting(false);
      dispatch(notInitialSearch());
      //setInitalSearch(false);
      // unshiftToCountryLoadingMore(
      //   oneAboveCurrentCountry,
      //   twoAboveCurrentCountry
      // );
      // pushToCountryLoadingMore(firstCountryOfList, secondCountryOfList);

      // const loadMoreCountryOptions2 = filterCountry.unshift(
      //   oneAboveCurrentCountry,
      //   twoAboveCurrentCountry
      // );
      // const loadMoreCountryOptions = filterCountry.push(
      //   firstCountryOfList,
      //   secondCountryOfList
      // );
      // setLoadingMoreCountries(filterCountry);
      // console.log(
      //   `${countryName} country name number is ${currentCountryIndexToNumber}`,
      //   filterCountry
      // );
    }
    if (
      countryName &&
      checkCountryExisting &&
      !undefined &&
      currentCountryIndexToNumber !== 0 &&
      currentCountryIndexToNumber !== 1 &&
      currentCountryIndexToNumber !== 248 &&
      currentCountryIndexToNumber !== 249
    ) {
      // unshiftToCountryLoadingMore(
      //   oneAboveCurrentCountry,
      //   twoAboveCurrentCountry
      // );
      // pushToCountryLoadingMore(
      //   oneBehindCurrentCountry,
      //   twoBehindCurrentCountry
      // );
      // const loadMoreCountryOptions2 = filterCountry.unshift(
      //   oneAboveCurrentCountry,
      //   twoAboveCurrentCountry
      // );
      // const loadMoreCountryOptions = filterCountry.push(
      //   oneBehindCurrentCountry,
      //   twoBehindCurrentCountry
      // );
      //setIsInputValueExisting(true);
      dispatch(notInitialSearch());
      //setInitalSearch(false);
      //setLoadingMoreCountries(filterCountry);
      // console.log(
      //   `Yes, there a ${countryName} country name here??`,
      //   filterCountry
      // );

      // } else if (!checkCountryExisting) {
      //   console.log("can not find the country~~~~~~~~~~");
    }
    if (!countryName) {
      //setIsInputValueExisting(false);
      //setLoadingMore(filterCountry);
      console.log("check only");
    }
  };
  const handleSearchCountryName = (e) => {
    setCountryName(e.target.value);
  };

  // useEffect(() => {
  //   dispatch(getFilteredCountry(countryName));
  // }, [countryName, dispatch]);
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
                {
                  loadingMoreCountries && loadingMoreCountries.length > 1
                    ? loadingMoreCountries?.map((country) => (
                        <SelectCountryList
                          key={country.id}
                          country={country}
                          loadingMore={loadingMoreCountries}
                          countryName={countryName}
                          // setCountryName={setCountryName}
                          // setOpenOptions={setOpenOptions}
                          //openOptions={openOptions}
                          checkCountryExisting={checkCountryExisting}
                        />
                      ))
                    : filterCountries?.map((country) => (
                        <List
                          country={country}
                          key={country?.id}
                          setCountryName={setCountryName}
                          // setOpenOptions={setOpenOptions}
                          //openOptions={openOptions}
                          checkCountryExisting={checkCountryExisting}
                          loadingMore={loadingMoreCountries}
                        />
                      ))
                  //<h1>inistal</h1>
                }
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
