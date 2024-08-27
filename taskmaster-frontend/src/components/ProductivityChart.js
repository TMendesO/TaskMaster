import React, { useEffect, useState } from "react";
import { getStats } from "../services/statsService";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registra os componentes necessários do Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const ProductivityChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getStats();
        const data = response.data;

        if (data && data.labels && data.values) {
          setChartData({
            labels: data.labels,
            datasets: [
              {
                label: "Tasks Completed",
                data: data.values,
                backgroundColor: "rgba(75,192,192,0.6)",
              },
            ],
          });
        } else {
          // Handle the case where data.labels or data.values are undefined
          setChartData({
            labels: [],
            datasets: [
              {
                label: "Tasks Completed",
                data: [],
                backgroundColor: "rgba(75,192,192,0.6)",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data", error);
        // Optionally set some default data or show an error message
        setChartData({
          labels: [],
          datasets: [
            {
              label: "Tasks Completed",
              data: [],
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default ProductivityChart;
