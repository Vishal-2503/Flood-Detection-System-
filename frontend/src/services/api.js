// Flood prediction API
export const predictFlood = async (lat, lng) => {
  const response = await fetch("http://127.0.0.1:8000/predict-flood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng
    })
  });

  return response.json();
};

// Soil moisture API (SMAP + ThingsBoard)
export const getSoilMoisture = async (lat, lng) => {
  const response = await fetch("http://127.0.0.1:8000/soil-moisture", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng
    })
  });

  return response.json();
};
