import React from "react";

const SelectCountryList = ({
  country,
  setCountryName,
  setOpenOptions,
  openOptions,
}) => {
  console.log("SELECT country", country);
  const handleChangeNameAndOpenClick = () => {
    setCountryName(country.name);
    setOpenOptions(!openOptions);
  };

  return (
    <li
      onClick={handleChangeNameAndOpenClick}
      className="liOption pluBackground"
    >
      <span className="flag">{country.flag}</span>
      <span className="flag">{country.name}</span>
    </li>
  );
};

export default SelectCountryList;
