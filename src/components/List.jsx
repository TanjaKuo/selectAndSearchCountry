import React from "react";

const List = ({ country, setCountryName, setOpenOptions, openOptions }) => {
  const checkRef = () => {
    setCountryName(country.name);
    setOpenOptions(!openOptions);
  };

  return (
    <li onClick={checkRef} className="liOption">
      <span className="flag">{country.flag}</span>
      <span className="flag">{country.name}</span>
    </li>
  );
};

export default List;
