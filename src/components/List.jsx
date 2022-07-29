import React from "react";

const List = ({
  text,
  setCountryName,
  setOpenOptions,
  openOptions,
  setWithCountryName,
  withCountryName,
}) => {
  //const nameRef = useRef();
  const checkRef = () => {
    //console.log(nameRef.current.innerText);
    //console.log('list text',text)
    //setCountry(text)
    setCountryName(text);
    setOpenOptions(!openOptions);
    //setWithCountryName(!withCountryName);
  };
  //ref={nameRef}
  return (
    <li onClick={checkRef} className="liOption">
      {text}
    </li>
  );
};

export default List;
