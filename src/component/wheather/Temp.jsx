import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import Weathercard from "./Weathercard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("surat");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=bab281d79e5f1e9755a68d754cc313e7`;

      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="searchTerm"
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <Weathercard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
