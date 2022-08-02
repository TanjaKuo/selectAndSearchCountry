import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryName } from "../features/country/countrySlice";

//import { closeOptions } from "../features/country/countrySlice";
import { closeOptions } from "../features/list/listSlice";

const List = ({ country, setCountryName, setOpenOptions }) => {
  console.log("LIST country", country);
  const { isLoading, error, countriesInfo, countryName } = useSelector(
    (state) => state.country
  );
  // const { isOpenOptions } =
  //    useSelector((state) => state.list);
  const dispatch = useDispatch();
  const handleChangeNameAndOpenClick = () => {
    setCountryName(country.name);
    //dispatch(getCountryName(country.name));
    dispatch(closeOptions());
    //setOpenOptions(!openOptions);å
  };

  return (
    <li onClick={handleChangeNameAndOpenClick} className="liOption">
      <span className="flag">{country.flag}</span>
      <span className="flag">{country.name}</span>
    </li>
  );
};

export default List;
