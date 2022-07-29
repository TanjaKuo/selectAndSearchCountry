import "./App.css";
import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import List from "./components/List";
//import { colourOptions, colourOptions2 } from "./data";

function App() {
  const [countryName, setCountryName] = useState("");
  console.log("~~~~~~~~~~~~~~`home countryName", countryName);
  const [countryInfo, setCountryInfo] = useState([]);
  //console.log("countryInfo", countryInfo);
  const [openOptions, setOpenOptions] = useState(false);
  //const [allCountry, setAllCountry] = useState(colourOptions);

  // const [countryOptions, setCountryOptions] = useState(countryInfo);
  // console.log("countryOptions", countryOptions);

  const [withCountryName, setWithCountryName] = useState(false);
  const [loadingMore, setLoadingMore] = useState([]);

  console.log("loadingMore--@@@@@@", loadingMore);
  //const [hasBackgroundColor, setHasBackgroundColor] = useState(false);
  const id = useId();
  const COUNTRY_URL = "https://restcountries.com/v3.1/all";

  // get index of country
  const getIndex = countryInfo.map((co) => co.name === countryName);
  //console.log("getIndex", getIndex);

  const getIndex2 = (countryName) => {
    return countryInfo.findIndex((obj) => obj.name === countryName);
  };

  const currentCountryIndexToNumber = parseInt(getIndex2(countryName));
  console.log(
    "currentCountryIndexToNumber number only",
    currentCountryIndexToNumber
  );
  console.log(
    "currentCountryIndexToNumber--------------",
    countryInfo[currentCountryIndexToNumber - 1]
  );

  //console.log(getIndex2(countryName));

  const filterCountry = countryInfo.filter((co) => {
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

  const handleClick = (e) => {
    e.target.placeholder = "Search";
    setOpenOptions(!openOptions);
    const nameOnly = countryInfo[currentCountryIndexToNumber - 1];
    console.log(" inside click nameOnly--1---1--1--", nameOnly);
    const nameOnly2 = countryInfo[currentCountryIndexToNumber - 2];
    console.log(" inside click nameOnly--2---2-2--", nameOnly2);
    const nameOnly3 = countryInfo[currentCountryIndexToNumber + 1];
    const nameOnly4 = countryInfo[currentCountryIndexToNumber + 2];

    const loadMoreCountryOptions2 = filterCountry.unshift(nameOnly2, nameOnly);
    console.log(
      "loadMoreCountryOptions2222",
      loadMoreCountryOptions2,
      filterCountry
    );

    const loadMoreCountryOptions = filterCountry.push(nameOnly3, nameOnly4);
    console.log(
      "loadMoreCountryOptions",
      loadMoreCountryOptions,
      filterCountry
    );

    // check if the countryName value is one of countryInfo

    const checkCountryExisting = countryInfo.map(
      (co) => co.name === countryName
    );
    console.log("check--------", checkCountryExisting);
    if (countryName !== "" && checkCountryExisting && !undefined) {
      setWithCountryName(false);
      setLoadingMore(filterCountry);
      console.log(
        `Yes, there a ${countryName}country name here??`,
        filterCountry
      );
    } else {
      setWithCountryName(true);
      setLoadingMore(filterCountry);
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
      {openOptions && (
        <div className="optionContainer">
          <ul className="ulOption">
            {withCountryName
              ? filterCountry?.map((b) => (
                  <List
                    b={b}
                    key={b?.id}
                    text={b?.name}
                    setCountryName={setCountryName}
                    setOpenOptions={setOpenOptions}
                    openOptions={openOptions}
                  />
                ))
              : loadingMore?.map((b) => (
                  <List
                    b={b}
                    key={b?.id}
                    text={b?.name}
                    setCountryName={setCountryName}
                    setOpenOptions={setOpenOptions}
                    openOptions={openOptions}
                  />
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
