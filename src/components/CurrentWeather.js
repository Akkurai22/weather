import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [aiAdvice, setAiAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
  const [dateTime, setDateTime] = useState('');

  const WEATHER_API_KEY = '220287e72084b5a88b02dd3cc9a3bcf4de25';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
            );
            setCurrentLocationWeather(res.data);
            setDateTime(getFormattedDateTime());
            generateAIAdvice(res.data.weather[0].description, res.data.main.temp);
          } catch (err) {
            console.error("Location weather error:", err);
          }
        },
        (err) => console.error("Geolocation error:", err)
      );
    }
  }, []);

  const getFormattedDateTime = () => {
    const now = new Date();
    const day = now.toLocaleDateString(undefined, { weekday: 'long' });
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${day}, ${date} - ${time}`;
  };
  
  const generateAIAdvice = (description, temp) => {
    let tip = 'Have a great day!';
    if (description.includes('rain')) tip = 'It might rain, carry an umbrella ☔';
    else if (temp > 35) tip = 'Stay hydrated! It’s really hot ☀️';
    else if (temp < 10) tip = 'Wear warm clothes, it’s cold 🧥';
    setAiAdvice(tip);
  };

  return (
    <div className="min flex flex-col items-center justify-center  p-6 text-gray-800 transition-all duration-500">
     

      {currentLocationWeather && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-5 rounded-2xl shadow-lg text-black w-full max-w-xs mb-6"
        >
          <h2 className="text-xl font-semibold mb-1">
            📍 {currentLocationWeather.name}
          </h2>
          <p className="text-sm text-gray-600">{dateTime}</p>
          <p className="mt-2 text-lg">🌡 {currentLocationWeather.main.temp}°C</p>
          <p className="text-sm">💧 Humidity: {currentLocationWeather.main.humidity}%</p>
          <p className="text-sm">🌥 {currentLocationWeather.weather[0].description}</p>

          {aiAdvice && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 bg-blue-100 p-3 rounded-lg text-sm"
            >
              <strong>AI Advice:</strong> {aiAdvice}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Weather;
