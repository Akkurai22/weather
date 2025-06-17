import React from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300 p-6 text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        🌦 Weather AI App
      </motion.h1>

      {/* Outer Background Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white/70 backdrop-blur-lg shadow-2xl p-8 rounded-xl w-[90%] max-w-md"
      >
        <CurrentWeather />
        <div className="my-4 border-t border-gray-300" />
        <Forecast />
      </motion.div>
    </div>
  );
}

export default App; 