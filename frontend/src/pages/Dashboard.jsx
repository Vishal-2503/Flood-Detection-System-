import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import Chatbot from "../components/Chatbot";
import { predictFlood, getSoilMoisture } from "../services/api";

export default function Dashboard({ setSoilHistory }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [risk, setRisk] = useState(null);
  const [soil, setSoil] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 📍 When user selects location from map
  const handleLocationSelect = async (latitude, longitude) => {
    setLat(latitude);
    setLng(longitude);
    setRisk(null);
    setSoil(null);
    setSoilHistory([]); // reset history for new location

    const response = await predictFlood(latitude, longitude);
    setRisk(response.flood_risk);
  };

  // 🌱 Fetch SMAP soil moisture and go to chart
  const handleSoilMoisture = async () => {
    if (!lat || !lng) return;

    setLoading(true);

    const data = await getSoilMoisture(lat, lng);
    setSoil(data);

    // Store with date → yearly / time-series graph
    setSoilHistory((prev) => [
      ...prev,
      {
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
        value: data.soil_moisture,
      },
    ]);

    setLoading(false);

    // 👉 Navigate to graph page
    navigate("/soil-chart");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌊 Flood & Soil Moisture Dashboard</h1>

      <MapView onLocationSelect={handleLocationSelect} />

      {risk && (
        <p>
          <b>Flood Risk:</b> {risk}
        </p>
      )}

      {lat && lng && (
        <button onClick={handleSoilMoisture} disabled={loading}>
          {loading ? "Fetching Soil Moisture..." : "🌱 View Soil Moisture Graph"}
        </button>
      )}

      {soil && (
        <div>
          <p>
            <b>Latest Soil Moisture:</b>{" "}
            {soil.soil_moisture} m³/m³
          </p>
          <p>
            <b>Status:</b> {soil.status}
          </p>
        </div>
      )}

      {risk && <Chatbot lat={lat} lng={lng} risk={risk} />}
    </div>
  );
}
