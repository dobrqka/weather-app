// import { useState } from "react";
import { useSelector } from "react-redux";
import WeatherCard from "./WeatherCard.jsx";
import "./WeatherInfo.css";
import { selectWeatherObj } from "./features/getterSlice";

function WeatherInfo() {
  // gets the current weather object containing all weather data
  const weatherObj = useSelector(selectWeatherObj);

  return (
    <>
      <div className="weather-info">
        {weatherObj !== "" && (
          <h2>
            Forecast for:{" "}
            {weatherObj.city.name + ", " + weatherObj.city.country}
          </h2>
        )}{" "}
        {weatherObj !== "" &&
          weatherObj.list.map((hourly, index) => (
            <WeatherCard
              generalInfo={hourly.dt_txt.slice(0, 13) + "h"}
              key={index}
              temperature={Math.round(hourly.main.temp) + "°C"}
              getImage={
                "http://openweathermap.org/img/w/" +
                hourly.weather[0].icon +
                ".png"
              }
              windSpeed={"Wind: " + hourly.wind.speed + " m/s"}
              feelsLike={"(Feel: " + Math.round(hourly.main.feels_like) + "°C)"}
            />
          ))}
      </div>
    </>
  );
}

export default WeatherInfo;
