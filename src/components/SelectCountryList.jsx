import React from "react";
import { useDispatch } from "react-redux";
import { closeOptions } from "../features/list/listSlice";
import { getCountryName } from "../features/country/countrySlice";

const SelectCountryList = ({
  country,
  setCountryName,
  setOpenOptions,
  openOptions,
}) => {
  //console.log("SELECT country", country);
  const dispatch = useDispatch();

  const handleChangeNameAndOpenClick = () => {
    //setCountryName(country.name);
    dispatch(getCountryName(country.name));
    dispatch(closeOptions());
    //setOpenOptions(!openOptions);
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
