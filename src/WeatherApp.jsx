import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import clear from "../images/clear.png";
import clouds from "../images/clouds.png";
import rain from "../images/rain.png";
import drizzle from "../images/drizzle.png";
import mist from "../images/mist.png";
import wind from "../images/wind.png";
import humidity from "../images/humidity.png";

const apiKey = "17d705c3dde0852cbc7e776fb8fbc222";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const checkWeather = async () => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("Invalid city name");
      }
      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return clear;
      case "Clouds":
        return clouds;
      case "Rain":
        return rain;
      case "Drizzle":
        return drizzle;
      case "Mist":
        return mist;
      default:
        return clear;
    }
  };

  return (
    <main className="w-screen bg-[#e8ecd6] h-screen flex justify-center items-center">
      <div className="card min-h-[95%] w-[350px] flex flex-col justify-around bg-[#c4e2ff] rounded-3xl p-5 text-center shadow-lg">
        <div className="search flex justify-evenly w-full mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            spellCheck="false"
            className="p-3 bg-[#ebfffc] rounded-full text-black text-lg outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={checkWeather}
            className="w-12 h-12 bg-[#2ebcf6] pl-4 text-white rounded-full transition duration-300 hover:bg-[#2ebcf6b5]"
          >
            <FaSearch />
          </button>
        </div>

        {error && <div className="error text-red-500 text-lg">{error}</div>}

        {weatherData && (
          <div className="cont">
            <div className="container bg-[#2ebcf655] text-white p-4 rounded-3xl shadow-md mb-4">
              <div className="weather-img">
                <img
                  src={getWeatherIcon(weatherData.weather[0].main)}
                  alt="Weather Icon"
                  className="weather-icon w-40 ml-14"
                />
              </div>
              <p className="temp text-5xl">
                {Math.round(weatherData.main.temp)}°C
              </p>
              <p className="city text-2xl">{weatherData.name}</p>
            </div>
            <div className="details bg-[#c4e2ff] rounded-3xl p-4 flex justify-around">
              <div className="col flex flex-col items-center">
                <img src={humidity} alt="" className="w-12 mb-2" />
                <p className="humidity text-xl">{weatherData.main.humidity}%</p>
                <h3>Humidity</h3>
              </div>
              <div className="col flex flex-col items-center">
                <img src={wind} alt="" className="w-12 mb-2" />
                <p className="wind text-xl">{weatherData.wind.speed} km/h</p>
                <h3>Wind Speed</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
