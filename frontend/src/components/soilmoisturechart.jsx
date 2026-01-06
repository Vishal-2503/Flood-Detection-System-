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

export default function SoilMoistureChart({ dataPoints }) {
  const data = {
    labels: dataPoints.map(d => d.time),
    datasets: [
      {
        label: "Soil Moisture (m³/m³)",
        data: dataPoints.map(d => d.value),
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 0.6
      }
    }
  };

  return <Line data={data} options={options} />;
}
