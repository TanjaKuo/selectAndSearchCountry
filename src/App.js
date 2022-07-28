import "./App.css";
import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import { colourOptions, colourOptions2 } from "./data";

const List = ({ text, setCountryName, setOpenOptions, openOptions }) => {
  //const nameRef = useRef();
  const checkRef = () => {
    //console.log(nameRef.current.innerText);
    //console.log('list text',text)
    //setCountry(text)
    setCountryName(text);
    setOpenOptions(!openOptions);
  };
  //ref={nameRef}
  return (
    <li onClick={checkRef} className="liOption">
      {text}
    </li>
  );
};

function App() {
  const [countryName, setCountryName] = useState("");
  //console.log("home countryName", countryName);
  const [countryInfo, setCountryInfo] = useState([]);
  //console.log("countryInfo", countryInfo);
  const [openOptions, setOpenOptions] = useState(false);
  const [allCountry, setAllCountry] = useState(colourOptions);
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
  console.log("currentCountryIndexToNumber", currentCountryIndexToNumber);

  //console.log(getIndex2(countryName));

  // const getRightIndex = () => {
  //   if (countryName && getIndex) {
  //     console.log("this is the right one and contine what are you doing");
  //   } else {
  //     console.log("this is wrong, nothing here");
  //   }
  // };

  const filterCountry = countryInfo.filter((co) => {
    return co.name
      .toLocaleLowerCase()
      .includes(countryName.toLocaleLowerCase());
  });
  console.log("1.filter", filterCountry);

  const showMore = () => {
    var obj = {};
    obj["id"] = ":rw:Greenland";
    obj["name"] = "Greenland5678";
    obj["flag"] = "🇬🇱";
    console.log("obj", obj);
    const neighbor = filterCountry.push(obj);
    console.log("2.filter", filterCountry);
    return neighbor;
    //return neighbor;
    //console.log("neibo", neighbor);
  };
  const handleClick = (e) => {
    e.target.placeholder = "Search";
    setOpenOptions(!openOptions);
    // all -> country name , abc -> true
    //const search = abc.map((c) => c === true);

    //-----getRightIndex();

    if (countryName) {
      showMore();
      console.log("show something??");
      //const currentCountryIndex = colourOptions.findIndex(countryName);
      //console.log("currentCountryIndex", currentCountryIndex);
      // console.log("filterCountry", filterCountry);
      // console.log("open countryName", countryName);

      // console.log("countryName", countryName, getIndex2(countryName));
      // console.log("countryName next", parseInt(getIndex2(countryName)));

      //console.log("filterCountry", filterCountry.puch("Japan"));

      // console.log(
      //   "push",
      //   filterCountry.push(getIndex2(countryName).length - 1)
      // );
    } else {
      console.log("no one");
    }
    // console.log("colourOptions", colourOptions);
    // console.log("countryName", countryName);
    // if(countryName !== '' && !filterCountry[1]) {
    //   console.log(" no more options filterCountry", filterCountry)
    // }
    //showMoreOption()
    // if (e.target.value !== "") {
    //   e.target.placeholder = countryName;
    //   e.target.value = "";
    //   console.log("1. e.target.value", e.target.value);
    // }

    // if (countryName !== "") {
    //   e.target.placeholder = countryName;
    //   e.target.value = "";
    //   console.log("e.target.placeholder", e.target.placeholder);
    //   console.log("2. e.target.value", e.target.value);
    // }
  };

  const handleSearchCountryName = (e) => {
    //setInputValue(e.target.value)
    setCountryName(e.target.value);
    // if (countryName) {
    //   setAllCountry(filterCountry);
    // }
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
            {filterCountry.map((b) => (
              <List
                key={b.name}
                text={b.name}
                setCountryName={setCountryName}
                setOpenOptions={setOpenOptions}
                openOptions={openOptions}
                // style={{
                //   backgroundColor: hasBackgroundColor ? "red" : "green",
                // }}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
