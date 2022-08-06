import "./App.css";
import React, { useEffect } from "react";
import List from "./components/List";
import SelectCountryList from "./components/SelectCountryList";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCountries,
  getCountryName,
  getFilteredCountry,
  getMoreOptions,
  initialSearch,
  notInitialSearch,
  getCurrentCountryIndex,
} from "./features/country/countrySlice";

import { openOptions } from "./features/list/listSlice";

function App() {
  const {
    isLoading,
    error,
    countriesInfo,
    countryName,
    loadingMoreCountries,
    isInitialSearch,
    filteredCountry,
    currentCountryIndexToNumber,
  } = useSelector((state) => state.country);
  const { isOpenOptions } = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const checkCountryExisting = countriesInfo.map(
    (country) => country.name === countryName
  );

  const handleClick = (e) => {
    e.target.placeholder = "Search";
    dispatch(openOptions());
    dispatch(initialSearch());
    dispatch(getFilteredCountry(countryName));
    dispatch(getCurrentCountryIndex(countryName));

    const regex = /[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]\s+/;
    if (regex.test(countryName)) {
      dispatch(getCountryName(countryName));
      dispatch(getCurrentCountryIndex(countryName));
    }
    if (currentCountryIndexToNumber === 0 && 1 && 248 && 249) {
      dispatch(notInitialSearch());
    }

    if (countryName && checkCountryExisting && !undefined) {
      dispatch(getMoreOptions(filteredCountry));
      dispatch(notInitialSearch());
    }
  };

  const handleSearchCountryName = (e) => {
    dispatch(getCountryName(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchCountries("name"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFilteredCountry(countryName));
  }, [countryName, dispatch]);

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
                      <SelectCountryList key={country.id} country={country} />
                    ))
                  : filteredCountry?.map((country) => (
                      <List country={country} key={country?.id} />
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
