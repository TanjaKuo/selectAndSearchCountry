import "./App.css";
import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import List from "./components/List";
import SelectCountryList from "./components/SelectCountryList";

//import { colourOptions, colourOptions2 } from "./data";

function App() {
  const [countryName, setCountryName] = useState("");
  console.log("~~~~~~~~~~~~~~`home countryName", countryName);
  const [countryInfo, setCountryInfo] = useState([]);
  //console.log("countryInfo", countryInfo);
  const [openOptions, setOpenOptions] = useState(false);
  const [isInputValueExisting, setIsInputValueExisting] = useState(false);
  const [loadingMore, setLoadingMore] = useState([]);
  //console.log("loadingMore--@@@@@@", loadingMore);
  const [initalSearch, setInitalSearch] = useState(false);

  const id = useId();
  const COUNTRY_URL = "https://restcountries.com/v3.1/all";

  // get index of country
  const getIndex = (countryName) => {
    return countryInfo.findIndex((obj) => obj.name === countryName);
  };

  const currentCountryIndexToNumber = parseInt(getIndex(countryName));
  // console.log(
  //   "currentCountryIndexToNumber number only",
  //   currentCountryIndexToNumber
  // );
  // console.log(
  //   "currentCountryIndexToNumber--------------",
  //   countryInfo[currentCountryIndexToNumber - 1]
  // );

  //console.log(getIndex2(countryName));

  const filterCountry = countryInfo.filter((co) => {
    return co.name
      .toLocaleLowerCase()
      .includes(countryName.toLocaleLowerCase());
  });

  const filterCountry2 = countryInfo.filter((co) => {
    return co.name
      .toLocaleLowerCase()
      .includes(countryName.toLocaleLowerCase());
  });
  //console.log("filterCountry", filterCountry);

  //const loadMoreCountryOptions = filterCountry.push({ name: "h&m" });
  //console.log("loadMoreCountryOptions", loadMoreCountryOptions, filterCountry);

  // const getCountryData = () => {
  //   let filterCountry = countryInfo.filter((co) => {
  //     return co.name
  //       .toLocaleLowerCase()
  //       .includes(countryName.toLocaleLowerCase());
  //   });

  //   // if can not find country
  //   if (!countryName) {
  //     console.log("no found countryname");
  //   } else {
  //     console.log("yes---");
  //   }
  // };

  const checkCountryExisting = countryInfo.map((co) => co.name === countryName);
  console.log("check--------", checkCountryExisting);

  const handleClick = (e) => {
    e.target.placeholder = "Search";
    setOpenOptions(!openOptions);
    setInitalSearch(true);
    const nameOnly = countryInfo[currentCountryIndexToNumber - 1];
    //console.log(" inside click nameOnly--1---1--1--", nameOnly);
    const nameOnly2 = countryInfo[currentCountryIndexToNumber - 2];
    //console.log(" inside click nameOnly--2---2-2--", nameOnly2);
    const nameOnly3 = countryInfo[currentCountryIndexToNumber + 1];
    const nameOnly4 = countryInfo[currentCountryIndexToNumber + 2];

    const lastone = countryInfo[249];
    const lastsecond = countryInfo[248];
    const firstone = countryInfo[0];
    const firstsecond = countryInfo[1];

    //const loadMoreCountryOptions2 = filterCountry.unshift(nameOnly2, nameOnly);
    // console.log(
    //   "loadMoreCountryOptions2222",
    //   loadMoreCountryOptions2,
    //   filterCountry
    // );

    //const loadMoreCountryOptions = filterCountry.push(nameOnly3, nameOnly4);
    // console.log(
    //   "loadMoreCountryOptions",
    //   loadMoreCountryOptions,
    //   filterCountry
    // );

    // check if the countryName value is one of countryInfo

    // if (countryName !== checkCountryExisting && !filterCountry) {
    //   // setWithCountryName(true);
    //   // console.log("no country existig!");
    //   return <List>Cant find anything here</List>;
    // }
    // if 0 || 1
    if (currentCountryIndexToNumber === 0) {
      setIsInputValueExisting(false);
      setInitalSearch(false);
      const loadMoreCountryOptions2 = filterCountry.unshift(
        lastsecond,
        lastone
      );
      const loadMoreCountryOptions = filterCountry.push(nameOnly3, nameOnly4);
      setLoadingMore(filterCountry);
      console.log(
        `${countryName} country name number is ${currentCountryIndexToNumber}`,
        filterCountry
      );
    }
    if (currentCountryIndexToNumber === 1) {
      setIsInputValueExisting(false);
      setInitalSearch(false);
      const loadMoreCountryOptions2 = filterCountry.unshift(lastone, nameOnly);
      const loadMoreCountryOptions = filterCountry.push(nameOnly3, nameOnly4);
      setLoadingMore(filterCountry);
      console.log(
        `${countryName} country name number is ${currentCountryIndexToNumber}`,
        filterCountry
      );
    }
    if (currentCountryIndexToNumber === 248) {
      setIsInputValueExisting(false);
      setInitalSearch(false);
      const loadMoreCountryOptions2 = filterCountry.unshift(
        nameOnly2,
        nameOnly
      );
      const loadMoreCountryOptions = filterCountry.push(nameOnly3, firstone);
      setLoadingMore(filterCountry);
      console.log(
        `${countryName} country name number is ${currentCountryIndexToNumber}`,
        filterCountry
      );
    }
    if (currentCountryIndexToNumber === 249) {
      setIsInputValueExisting(false);
      setInitalSearch(false);
      const loadMoreCountryOptions2 = filterCountry.unshift(
        nameOnly2,
        nameOnly
      );
      const loadMoreCountryOptions = filterCountry.push(firstone, firstsecond);
      setLoadingMore(filterCountry);
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
      const loadMoreCountryOptions2 = filterCountry.unshift(
        nameOnly2,
        nameOnly
      );
      const loadMoreCountryOptions = filterCountry.push(nameOnly3, nameOnly4);
      setIsInputValueExisting(true);
      setInitalSearch(false);
      setLoadingMore(filterCountry);
      console.log(
        `Yes, there a ${countryName} country name here??`,
        filterCountry
      );

      // } else if (!checkCountryExisting) {
      //   console.log("can not find the country~~~~~~~~~~");
      // } else {
      //   setIsInputValueExisting(false);
      //   //setLoadingMore(filterCountry);
      //   console.log("check only");
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
      //console.log("eachInfo", eachInfo);
      setCountryInfo(eachCountryInfo);
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
        //defaultValue={inputValue || ''}
        value={countryName || ""}
      />
      <small className="arrowDown">▼</small>
      {openOptions && (
        <div className="optionContainer">
          <ul
            className="ulOption"
            style={{ overflow: initalSearch ? "scroll" : "none" }}
          >
            {loadingMore && loadingMore.length > 1
              ? loadingMore?.map((b) => (
                  <SelectCountryList
                    b={b}
                    loadingMore={loadingMore}
                    countryName={countryName}
                    setCountryName={setCountryName}
                    setOpenOptions={setOpenOptions}
                    openOptions={openOptions}
                    checkCountryExisting={checkCountryExisting}
                  />
                ))
              : filterCountry?.map((b) => (
                  <List
                    b={b}
                    key={b?.id}
                    // text={b?.name}
                    setCountryName={setCountryName}
                    setOpenOptions={setOpenOptions}
                    openOptions={openOptions}
                    checkCountryExisting={checkCountryExisting}
                    loadingMore={loadingMore}
                  />
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
