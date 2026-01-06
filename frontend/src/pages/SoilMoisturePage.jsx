import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function SoilMoisturePage({ soilHistory }) {
  const chartData = {
    labels: soilHistory.map(item => item.date),
    datasets: [
      {
        label: "SMAP Soil Moisture (m³/m³)",
        data: soilHistory.map(item => item.value),
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Soil Moisture"
        }
      },
      x: {
        title: {
          display: true,
          text: "Date"
        }
      }
    }
  };

  return (
    <div style={{ width: "85%", margin: "auto" }}>
      <h2>📈 Yearly Soil Moisture Trend (SMAP)</h2>

      {soilHistory.length === 0 ? (
        <p>No soil moisture data available.</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}
  