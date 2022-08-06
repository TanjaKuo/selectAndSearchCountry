import React from "react";
import { useDispatch } from "react-redux";
import { getCountryName } from "../features/country/countrySlice";

import { closeOptions } from "../features/list/listSlice";

const List = ({ country }) => {
  const dispatch = useDispatch();

  const handleChangeNameAndOpenClick = () => {
    const CountryNameWithFlag = country.flag + "   " + country.name;
    dispatch(getCountryName(CountryNameWithFlag));
    dispatch(closeOptions());
  };

  return (
    <li onClick={handleChangeNameAndOpenClick} className="liOption">
      <span className="flag">{country.flag}</span>
      <span className="flag">{country.name}</span>
    </li>
  );
};

export default List;
