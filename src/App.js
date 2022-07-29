import "./App.css";
import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import List from "./components/List";
//import { colourOptions, colourOptions2 } from "./data";

function App() {
  const [countryName, setCountryName] = useState("");
  //console.log("home countryName", countryName);
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
  //console.log("currentCountryIndexToNumber", currentCountryIndexToNumber);

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

    const loadMoreCountryOptions = filterCountry.push({
      id: "892",
      name: "Tai",
      flag: "@@",
    });
    console.log(
      "loadMoreCountryOptions",
      loadMoreCountryOptions,
      filterCountry
    );

    // check if the countryName value is one of countryInfo

    const checkCountryExisting = countryInfo.map((co) =>
      co.name.includes(countryName)
    );
    const checkCountryExisting2 = countryInfo.map(
      (co) => co.name === countryName
    );
    console.log("check--------", checkCountryExisting2);
    if (countryName && checkCountryExisting2 && !undefined) {
      setWithCountryName(false);
      console.log(`Yes, there a ${countryName}country name here??`);
      setLoadingMore(filterCountry);
    } else {
      setWithCountryName(true);
      setLoadingMore(filterCountry);
      console.log("check only");
    }
    // if (!checkCountryExisting) {
    //   setWithCountryName(false);
    // }
    // else {
    //   setWithCountryName(false);
    //   console.log("no ocountry name here");
    // }
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
      <h1>1</h1>
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
                    key={b.name}
                    text={b.name}
                    setCountryName={setCountryName}
                    setOpenOptions={setOpenOptions}
                    openOptions={openOptions}
                    // setWithCountryName={setWithCountryName}
                    // withCountryName={withCountryName}
                    // style={{
                    //   backgroundColor: hasBackgroundColor ? "red" : "green",
                    // }}
                  />
                ))
              : loadingMore.map((b) => (
                  <List
                    key={b.name}
                    text={b.name}
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
