import { useState } from "react";
import MapView from "../components/MapView";
import { predictFlood } from "../services/api";
import Chatbot from "../components/Chatbot";

export default function Dashboard() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [risk, setRisk] = useState("");

  const handleLocationSelect = async (latitude, longitude) => {
    setLat(latitude);
    setLng(longitude);

    const result = await predictFlood(latitude, longitude);
    setRisk(result.flood_risk);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌊 Flood Forecasting Dashboard</h1>

      {/* Google Map */}
      <MapView onLocationSelect={handleLocationSelect} />

      {/* Selected Location + Flood Risk */}
      {lat && lng && (
        <div style={{ marginTop: "20px" }}>
          <h3>📍 Selected Location</h3>
          <p>Latitude: {lat.toFixed(5)}</p>
          <p>Longitude: {lng.toFixed(5)}</p>

          <h2 style={{ color: "red" }}>
            ⚠ Flood Risk: {risk}
          </h2>
        </div>
      )}

      {/* 🤖 CHATBOT — ADD IT HERE 👇 */}
      {risk && (
        <Chatbot lat={lat} lng={lng} risk={risk} />
      )}
    </div>
  );
}
