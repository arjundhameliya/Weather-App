import React from "react";
import { useState, useEffect } from "react";

const Weathercard = ({ tempInfo }) => {
  const [weatherstate, setweadherState] = useState("");

  const {
    temp,
    humidity,
    pressure,
    weathermood,
    name,
    speed,
    country,
    sunset,
  } = tempInfo;

  useEffect(() => {
    if (weathermood) {
      switch (weathermood) {
        case "Clouds":
          setweadherState("wi-day-cloudy");
          break;
        case "Haze":
          setweadherState("wi-fog");
          break;
        case "Clouds":
          setweadherState("wi-day-sunny");
          break;
          case "Mist":
            setweadherState("wi-dust");
            break;
  
        default:
          setweadherState("wi-day-sunny");

          break;
      }
    }
  }, [weathermood]);

  let sec = sunset;
  let date = new Date(sec * 1000);
  let timestr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return (
    <>
      {/* our temp card */}
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherstate} `}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{temp}°deg</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{weathermood}</div>
            <div className="place">
              {name} {country}
            </div>
          </div>
        </div>
        <div className="date">{new Date().toLocaleString()}</div>
        {/* our 4 colom section */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {timestr} <br />
                Sunset
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {humidity} <br />
                humidity
              </p>
            </div>
          </div>
          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {pressure} <br />
                rain
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {speed} <br />
                wind
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Weathercard;
