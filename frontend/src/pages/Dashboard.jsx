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
  const [clickCount, setClickCount] = useState(0);

  const navigate = useNavigate();

  const handleLocationSelect = async (latitude, longitude) => {
    setLat(latitude);
    setLng(longitude);
    setRisk(null);
    setSoil(null);
    setClickCount(0);

    const response = await predictFlood(latitude, longitude);
    setRisk(response.flood_risk);

    setSoilHistory([]); // reset history on new location
  };

  const handleSoilMoisture = async () => {
    const data = await getSoilMoisture(lat, lng);
    setSoil(data);

    setSoilHistory(prev => [
      ...prev,
      {
        value: data.soil_moisture,
        time: new Date().toLocaleTimeString()
      }
    ]);

    setClickCount(prev => prev + 1);

    // SECOND CLICK → NAVIGATE
    if (clickCount + 1 === 2) {
      navigate("/soil-chart");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌊 Flood & Soil Moisture Dashboard</h1>

      <MapView onLocationSelect={handleLocationSelect} />

      {risk && <p><b>Flood Risk:</b> {risk}</p>}

      {lat && lng && (
        <button onClick={handleSoilMoisture}>
          🌱 Show Soil Moisture
        </button>
      )}

      {soil && (
        <div>
          <p><b>Soil Moisture:</b> {soil.soil_moisture} m³/m³</p>
          <p><b>Status:</b> {soil.status}</p>
        </div>
      )}

      {risk && <Chatbot lat={lat} lng={lng} risk={risk} />}
    </div>
  );
}
