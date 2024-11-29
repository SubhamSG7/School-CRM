import React, { useEffect, useState } from "react";
import { getAnalytics } from "../Redux/Apis/getAnalytics";
import { useDispatch, useSelector } from "react-redux";
import { setIncomeAnalytics } from "../Redux/Slices/AnalyticsSlice";
import { Bar } from "react-chartjs-2"; // Importing the Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IncomeAnalytics() {
  const { type, incomeAnalytics } = useSelector(
    (state) => state.analyticsSlice
  );
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState(type || "monthly");

  useEffect(() => {
    async function fetch() {
      const resp = await getAnalytics({ type: selectedType });
      dispatch(setIncomeAnalytics(resp?.data));
    }
    fetch();
  }, [selectedType, dispatch]); // Fetch data when the selectedType changes

  // Handle type change
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value); // Update selected type
  };

  // Chart Data
  const chartData = {
    labels: ["Total Expenditure", "Total Income from Fee"], // Labels for the bar chart
    datasets: [
      {
        label: "Amount in INR", // Label for the dataset
        data: [
          incomeAnalytics?.totalExpenditure || 0, // Total expenditure value
          incomeAnalytics?.totalIncomeFromFee || 0, // Total income from fee value
        ],
        backgroundColor: ["#FF5733", "#33B5FF"], // Colors for each bar
        borderColor: ["#FF5733", "#33B5FF"], // Border colors for the bars
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Income and Expenditure Analytics (${
          selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
        })`,
      },
    },
  };

  return (
    <div className="flex w-screen justify-center h-[50vh] bg-gray-100 mt-12">
      <div className="w-screen max-w-4xl p-4">
        <h2 className="text-center font-semibold text-xl mb-4">
          Income and Expenditure Analytics
        </h2>

        <div className="flex justify-center mb-4">
          <label className="mr-2 text-lg font-semibold">Select Period: </label>
          <select
            className="border p-2 rounded-md"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="flex">
          <div className="max-h-[500px] w-screen max-w-[500px] m-auto">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeAnalytics;
