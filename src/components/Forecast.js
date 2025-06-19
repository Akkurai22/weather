import React, { useState } from "react";
import axios from "axios";
import WeatherChart from "./WeatherChart";

const Forecast = () => {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = "87e72084b5a88b02dd3cc9a3bcf4de25";

  const getForecast = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${trimmedCity}&units=metric&appid=${apiKey}`
      );
      const daily = res.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(daily);
    } catch (error) {
      console.error("Forecast fetch error:", error);
      alert("City not found or network issue.");
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto text-gray-800">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded text-black"
        />
        <button
          onClick={getForecast}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Loading..." : "5-Day Forecast"}
        </button>
      </div>

      {forecast.length > 0 && (
        <div>
          <ul className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-sm">
            {forecast.map((item, i) => (
              <li key={i} className="bg-blue-100 p-3 rounded-xl shadow-sm">
                <p className="font-semibold">
                  {new Date(item.dt_txt).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-lg">🌡️ {item.main.temp}°C</p>
                <p>{item.weather[0].main}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <WeatherChart forecast={forecast} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast;
