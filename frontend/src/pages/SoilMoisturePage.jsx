import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function SoilMoisturePage({ soilHistory }) {
  const data = {
    labels: soilHistory.map((d, i) => `Reading ${i + 1}`),
    datasets: [
      {
        label: "Soil Moisture (m³/m³)",
        data: soilHistory.map(d => d.value),
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌱 Soil Moisture Bar Chart</h2>
      <Bar data={data} />
    </div>
  );
}
