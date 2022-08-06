import React from "react";
import { useDispatch } from "react-redux";
import { closeOptions } from "../features/list/listSlice";
import { getCountryName } from "../features/country/countrySlice";

const SelectCountryList = ({ country }) => {
  const dispatch = useDispatch();

  const handleChangeNameAndOpenClick = () => {
    const CountryNameWithFlag = country.flag + "   " + country.name;

    dispatch(getCountryName(CountryNameWithFlag));
    dispatch(closeOptions());
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
