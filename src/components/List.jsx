import React from "react";

const List = ({
  b,
  setCountryName,
  setOpenOptions,
  openOptions,
  loadingMore,
}) => {
  //console.log(" LIST b ", b);
  //console.log(" LIST loadingMore ", loadingMore);
  const checkRef = () => {
    setCountryName(b.name);
    setOpenOptions(!openOptions);
  };

  //const handleChange = (e) =>setCountryName(b.name));

  return (
    <>
      {/* {loadingMore ? (
        loadingMore.map((b) => (
          <li className="liOption pluBackground">
            <span className="flag">{b.flag}</span>
            <span className="flag">{b.name}</span>
            {text}
          </li>
        ))
      ) : ( */}
      <li onClick={checkRef} className="liOption pluBackground">
        <span className="flag">{b.flag}</span>
        <span className="flag">{b.name}</span>
      </li>
      {/* )} */}
      {/* {loadingMore && loadingMore.length > 1 ? (
        loadingMore.map((b) => (
          <li
            onClick={checkRef2}
            className="liOption pluBackground"
            onChange={() => setCountryName(b.name)}
          >
            <span className="flag">{b.flag}</span>
            <span className="flag">{b.name}</span>
          </li>
        ))
      ) : (
        <li onClick={checkRef} className="liOption pluBackground">
          <span className="flag">{b.flag}</span>
          <span className="flag">{b.name}</span>
         
        </li>
      )} */}
    </>
  );
};

export default List;
