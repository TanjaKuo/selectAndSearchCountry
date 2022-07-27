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
  //console.log("home countryName", countryName);
  
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
    // if(countryName !== '' && !filterCountry[1]) {
    //   console.log(" no more options filterCountry", filterCountry)
    // }
    //showMoreOption()
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
  console.log('1.filter', filterCountry);

  
const currentCountryIndex = colourOptions.find((co) => co.name.official === filterCountry[0].name.official )
console.log('curret', currentCountryIndex);
console.log('curret', currentCountryIndex);


  // const showMoreOption = () => {

  //  // define current country index
  // const currentCountry = filterCountry[0].name.official
  // console.log('showmore currentCountry', currentCountry);
  
  // // map every
  // const eachCountry = colourOptions.map(co => co.name.official)
  
  // eachCountry.forEach((co, i) => console.log('co, i', co, i))

  // // find the index
  // for (let i = 0; i< colourOptions.length; i++) {
  //   const currentIndex = 
  //   if(currentCountry === eachCountry[i]) {
  //     console.log('found it')
  //   } else {
  //     console.log('no')
  //   }
  // }
  

    // for (let i = 0; i < filterCountry.length; i++) {
    //   if(currentCountry !== filterCountry[0].name.official) {
    //     console.log('no found!')
    //   } else {
    //     console.log('found it')
    //   }
    // }
    // const otherOptions = colourOptions.map((c) => {
    //   return c.name.official
    // })

    // console.log('otherOptions', otherOptions);
    // console.log('filter inside', filterCountry);
    // if(currentCountry) {
    //   console.log(currentCountry.length)
    // //return filterCountry.push(otherOptions[0], otherOptions[1], currentCountry, otherOptions[3], otherOptions[4])
    // }
    // return filterCountry
    //console.log('showmore otherOption', otherOptions);
  //}


  // const showOptions = () => {
  //   if(countryName !== '') 
  //   console.log('heello again');
  // }  


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
