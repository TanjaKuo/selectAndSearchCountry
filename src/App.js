import "./App.css";
import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import List from "./components/List";
import SelectCountryList from "./components/SelectCountryList";

function App() {
  const [countryName, setCountryName] = useState("");
  //console.log("~~~~~~~~~~~~~~`home countryName", countryName);
  const [countriesInfo, setCountriesInfo] = useState([]);
  //console.log("countryInfo", countryInfo);
  const [openOptions, setOpenOptions] = useState(false);
  //const [isInputValueExisting, setIsInputValueExisting] = useState(false);
  const [loadingMoreCountries, setLoadingMoreCountries] = useState([]);
  //console.log("loadingMore--@@@@@@", loadingMoreCountries);
  const [initalSearch, setInitalSearch] = useState(false);

  const id = useId();
  const COUNTRY_URL = "https://restcountries.com/v3.1/all";

  // get index of country
  const getIndex = (countryName) => {
    return countriesInfo.findIndex((country) => country.name === countryName);
  };

  const currentCountryIndexToNumber = parseInt(getIndex(countryName));
  // console.log(
  //   "currentCountryIndexToNumber number only",
  //   currentCountryIndexToNumber
  // );

  const filterCountry = countriesInfo.filter((co) => {
    return co.name
      .toLocaleLowerCase()
      .includes(countryName.toLocaleLowerCase());
  });

  const checkCountryExisting = countriesInfo.map(
    (country) => country.name === countryName
  );
  //console.log("check--------", checkCountryExisting);

  const unshiftToCountryLoadingMore = (countryA, countryB) => {
    return filterCountry.unshift(countryA, countryB);
  };

  const pushToCountryLoadingMore = (countryA, countryB) => {
    return filterCountry.unshift(countryA, countryB);
  };

  const handleClick = (e) => {
    e.target.placeholder = "Search";
    setOpenOptions(!openOptions);
    setInitalSearch(true);
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

    const loadMoreCountryOptions2 = filterCountry.unshift();
    console.log("UNSHIFT", loadMoreCountryOptions2);

    // if 0 || 1
    if (currentCountryIndexToNumber === 0) {
      //setIsInputValueExisting(false);
      setInitalSearch(false);
      // unshiftToCountryLoadingMore(secondLastCountryOfList, lastCountryOfList);
      // pushToCountryLoadingMore(
      //   oneBehindCurrentCountry,
      //   twoBehindCurrentCountry
      // );
      const loadMoreCountryOptions2 = filterCountry.unshift(
        secondLastCountryOfList,
        lastCountryOfList
      );
      const loadMoreCountryOptions = filterCountry.push(
        oneBehindCurrentCountry,
        twoBehindCurrentCountry
      );
      setLoadingMoreCountries(filterCountry);
      // console.log(
      //   `${countryName} country name number is ${currentCountryIndexToNumber}`,
      //   filterCountry
      // );
    }
    if (currentCountryIndexToNumber === 1) {
      //setIsInputValueExisting(false);
      setInitalSearch(false);
      // unshiftToCountryLoadingMore(lastCountryOfList, twoAboveCurrentCountry);
      // pushToCountryLoadingMore(
      //   oneBehindCurrentCountry,
      //   twoBehindCurrentCountry
      // );
      const loadMoreCountryOptions2 = filterCountry.unshift(
        lastCountryOfList,
        twoAboveCurrentCountry
      );

      const loadMoreCountryOptions = filterCountry.push(
        oneBehindCurrentCountry,
        twoBehindCurrentCountry
      );
      setLoadingMoreCountries(filterCountry);
      // console.log(
      //   `${countryName} country name number is ${currentCountryIndexToNumber}`,
      //   filterCountry
      // );
    }
    if (currentCountryIndexToNumber === 248) {
      //setIsInputValueExisting(false);
      setInitalSearch(false);
      // unshiftToCountryLoadingMore(
      //   oneAboveCurrentCountry,
      //   twoAboveCurrentCountry
      // );
      // pushToCountryLoadingMore(oneBehindCurrentCountry, firstCountryOfList);

      const loadMoreCountryOptions2 = filterCountry.unshift(
        oneAboveCurrentCountry,
        twoAboveCurrentCountry
      );
      const loadMoreCountryOptions = filterCountry.push(
        oneBehindCurrentCountry,
        firstCountryOfList
      );
      setLoadingMoreCountries(filterCountry);
      // console.log(
      //   `${countryName} country name number is ${currentCountryIndexToNumber}`,
      //   filterCountry
      // );
    }
    if (currentCountryIndexToNumber === 249) {
      //setIsInputValueExisting(false);
      setInitalSearch(false);
      // unshiftToCountryLoadingMore(
      //   oneAboveCurrentCountry,
      //   twoAboveCurrentCountry
      // );
      // pushToCountryLoadingMore(firstCountryOfList, secondCountryOfList);

      const loadMoreCountryOptions2 = filterCountry.unshift(
        oneAboveCurrentCountry,
        twoAboveCurrentCountry
      );
      const loadMoreCountryOptions = filterCountry.push(
        firstCountryOfList,
        secondCountryOfList
      );
      setLoadingMoreCountries(filterCountry);
      console.log(
        `${countryName} country name number is ${currentCountryIndexToNumber}`,
        filterCountry
      );
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
      const loadMoreCountryOptions2 = filterCountry.unshift(
        oneAboveCurrentCountry,
        twoAboveCurrentCountry
      );
      const loadMoreCountryOptions = filterCountry.push(
        oneBehindCurrentCountry,
        twoBehindCurrentCountry
      );
      //setIsInputValueExisting(true);
      setInitalSearch(false);
      setLoadingMoreCountries(filterCountry);
      console.log(
        `Yes, there a ${countryName} country name here??`,
        filterCountry
      );

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

  useEffect(() => {
    const getCountryData = async () => {
      const response = await axios.get(COUNTRY_URL);
      const datas = response.data;
      const eachCountryInfo = datas.map((data) => ({
        id: id + data.name.official,
        name: data.name.official,
        flag: data.flag,
      }));
      setCountriesInfo(eachCountryInfo);
    };
    getCountryData();
  }, [id]);

  return (
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
      {openOptions && (
        <div className="optionContainer">
          <ul
            className="ulOption"
            style={{ overflow: initalSearch ? "scroll" : "none" }}
          >
            {loadingMoreCountries && loadingMoreCountries.length > 1
              ? loadingMoreCountries?.map((country) => (
                  <SelectCountryList
                    key={country.id}
                    country={country}
                    loadingMore={loadingMoreCountries}
                    countryName={countryName}
                    setCountryName={setCountryName}
                    setOpenOptions={setOpenOptions}
                    openOptions={openOptions}
                    checkCountryExisting={checkCountryExisting}
                  />
                ))
              : filterCountry?.map((country) => (
                  <List
                    country={country}
                    key={country?.id}
                    setCountryName={setCountryName}
                    setOpenOptions={setOpenOptions}
                    openOptions={openOptions}
                    checkCountryExisting={checkCountryExisting}
                    loadingMore={loadingMoreCountries}
                  />
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
