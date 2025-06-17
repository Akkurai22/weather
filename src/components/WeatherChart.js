import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const WeatherChart = ({ forecast }) => {
  const data = {
    labels: forecast.map((item) => new Date(item.dt_txt).toLocaleDateString()),
    datasets: [
      {
        label: "Temp (°C)",
        data: forecast.map((item) => item.main.temp),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return <Line data={data} />;
};

export default WeatherChart;
