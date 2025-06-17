import React, { useState } from "react";
import axios from "axios";
import WeatherChart from "./WeatherChart";

const Forecast = () => {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const apiKey = "87e72084b5a88b02dd3cc9a3bcf4de25";

  const getForecast = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      const daily = res.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(daily);
    } catch {
      alert("City not found!");
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow max-w-xl mx-auto">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Enter city"
          className="flex-1 p-2 border rounded"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getForecast}
          className="bg-green-500 text-white px-4 rounded"
        >
          5-Day Forecast
        </button>
      </div>

      {forecast.length > 0 && (
        <div>
          <ul className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-sm">
            {forecast.map((item, i) => (
              <li key={i} className="bg-blue-100 p-2 rounded">
                <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                <p>🌡️ {item.main.temp}°C</p>
                <p>{item.weather[0].main}</p>
              </li>
            ))}
          </ul>
          <WeatherChart forecast={forecast} />
        </div>
      )}
    </div>
  );
};

export default Forecast;
