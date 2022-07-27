import logo from "./logo.svg";
import "./App.css";
import React, { useRef, useState } from "react";
import { colourOptions } from "./data";


const List = ({text,setCountryName, setOpenOptions, openOptions, }) => {
  
    //const nameRef = useRef();
    const checkRef = () => {
    //console.log(nameRef.current.innerText);
    //console.log('list text',text)
    //setCountry(text)
    setCountryName(text)
    setOpenOptions(!openOptions)

  }
  //ref={nameRef}
  return (
    <li  className='selected' onClick={checkRef}  className="liOption">
      {text}
    </li>
  );
}


function App() {
  const [inputValue, setInputValue] = useState('Select')
  //console.log('home inputValue', inputValue)

  const [countryName, setCountryName] = useState("");
  console.log("home countryName", countryName);
  
  const [openOptions,setOpenOptions] = useState(false)
  //const [openOptionsAgain,setOpenOptionsAgain] = useState(false)

  // const [country, setCountry] = useState('')
//   console.log('country value', country);

  //const handleSearchCountryName = (e) => setInputValue(e.target.value);
  
  //  const nameRef = useRef();
  // console.log("nameRef", nameRef);
  // const inputRef = useRef();
  // console.log("nameRef", inputRef);

  const handleClick = (e) => {
    e.target.placeholder = "Search";
    //setInputValue('Search')
    setOpenOptions(!openOptions)
    
  };
    const handleSearchCountryName = (e) => {
    //setInputValue(e.target.value)
    setCountryName(e.target.value)
  };

  const filterCountry = colourOptions.filter((co) => {
    return co.name.official
      .toLocaleLowerCase()
      .includes(countryName.toLocaleLowerCase());
  });

  const showOptions = () => {
    if(countryName !== '') 
    console.log('heello again');
  }  

  // const handleChangeInput = (e) => {
  //   // setCountryName(country)
  //   // console.log('change input countryName', countryName)
  //   //console.log("abc", nameRef.current.innerText);
  //   //console.log("abcde", text);
  //    //setInputValue(country)
  // };

  return (
    <div className="App">
      <h1>1</h1>
      <input
        type="text"
        placeholder="Select"
        onChange={handleSearchCountryName}
        onClick={handleClick}
        //ref={inputRef}
        className="inputContainer"
        //defaultValue={inputValue || ''}
       value={countryName || ''}
      />
      {openOptions && (
      
      <div className="optionContainer">
      <ul className="ulOption">
      {filterCountry.map((b) => (
        <List key={b.name.official} 
        text={b.name.official} 
        //onClick={handleChangeInput} 
        setCountryName={setCountryName} 
        setOpenOptions={setOpenOptions} 
        openOptions={openOptions}
        // openAgagin={openAgagin}
        // setOpenAgain={setOpenAgain}
        />
      ))}
      </ul>
      </div>) }



      {/* {openOptionsAgain && (
      <div className="optionContainer">
        <h1>2</h1>
      <ul className="ulOption">
      {filterCountry.map((b) => (
        <List key={b.name.official} 
        text={b.name.official} 
        //onClick={handleChangeInput} 
        setCountryName={setCountryName} 
        setOpenOptions={setOpenOptions} 
        openOptions={openOptions}
        // openAgagin={openAgagin}
        // setOpenAgain={setOpenAgain}
        />
      ))}
      </ul>
      </div>) } */}
    </div>
  );
}

export default App;
