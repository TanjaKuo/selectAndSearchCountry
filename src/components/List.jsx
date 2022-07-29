import React from "react";

const List = ({
  b,
  //   text,
  setCountryName,
  setOpenOptions,
  openOptions,
  setWithCountryName,
  withCountryName,
}) => {
  console.log("b", b);
  //const nameRef = useRef();
  const checkRef = () => {
    //console.log(nameRef.current.innerText);
    //console.log('list text',text)
    //setCountry(text)
    setCountryName(b.name);
    setOpenOptions(!openOptions);
    //setWithCountryName(!withCountryName);
  };
  //ref={nameRef}
  return (
    <li onClick={checkRef} className="liOption">
      <span className="flag">{b.flag}</span>
      <span className="flag">{b.name}</span>
      {/* {text} */}
    </li>
  );
};

export default List;
