import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SoilMoisturePage from ".../pages/SoilMoisturePage";
import { useState } from "react";

export default function App() {
  const [soilHistory, setSoilHistory] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard setSoilHistory={setSoilHistory} />}
        />
        <Route
          path="/soil-chart"
          element={<SoilMoisturePage soilHistory={soilHistory} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
