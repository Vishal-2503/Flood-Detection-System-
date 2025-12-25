import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 20.5937,
  lng: 78.9629, // India center
};

export default function MapView({ onLocationSelect }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // 1️⃣ Set marker on map
    setMarkerPosition({ lat, lng });

    // 2️⃣ SEND DATA TO DASHBOARD (THIS LINE 👇)
    onLocationSelect(lat, lng);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScript>
  );
}
