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

  const fetchData = async () => {
    try {
      const response = await getStats();
      const data = response.data;

      setChartData({
        labels: data.months || [],
        datasets: [
          {
            label: "Aberto",
            data: data.open || [],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
          {
            label: "Pendente",
            data: data.pending || [],
            backgroundColor: "rgba(255, 206, 86, 0.6)",
          },
          {
            label: "Concluído",
            data: data.completed || [],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();

    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.action) {
        fetchData();
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default ProductivityChart;
