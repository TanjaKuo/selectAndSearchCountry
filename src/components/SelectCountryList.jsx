import React, { useState } from "react";
import List from "./List";

const SelectCountryList = ({
  b,
  countryName,
  setCountryName,
  setOpenOptions,
  openOptions,
  loadingMore,
  checkCountryExisting,
}) => {
  const [isCountryExisting, setIsCountryExisting] = useState(true);
  //console.log(" SELECT loadingMore", loadingMore);
  //console.log("SELECT b", b);

  const checkRef = () => {
    setCountryName(b.name);
    setOpenOptions(!openOptions);
    // setOpenOptions(!openOptions);
    // if (countryName) {
    //   loadingMore.map((b) => setCountryName(b.name));
    // }
    // // setCountryName(b.name);
    // if (!checkCountryExisting) {
    //   setIsCountryExisting(false);
    // }
  };

  return (
    <>
      <li onClick={checkRef} className="liOption pluBackground">
        <span className="flag">{b.flag}</span>
        <span className="flag">{b.name}</span>
      </li>
    </>
  );
};

export default SelectCountryList;
