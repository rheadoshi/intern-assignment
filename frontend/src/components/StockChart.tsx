import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = ({ data }: { data: any[] }) => {
  // Assuming the data is an array of objects, each with date and price
  const dates = data.map((entry: any) => entry.date); // adjust according to your data structure
  const prices = data.map((entry: any) => entry.price); // adjust according to your data structure

  // Chart.js data format
  const chartData = {
    labels: dates, // X-axis labels (dates)
    datasets: [
      {
        label: "Stock Price", // Chart label
        data: prices, // Y-axis data (prices)
        borderColor: "rgba(75,192,192,1)", // Line color
        backgroundColor: "rgba(75,192,192,0.2)", // Fill color
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Stock Price Over Time",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `$${tooltipItem.raw.toFixed(2)}`, // Format tooltip
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StockChart;
