def predict_flood_risk(lat: float, lon: float):
    if lat > 20 and lon > 75:
        return "High Flood Risk"
    elif lat > 10:
        return "Moderate Flood Risk"
    else:
        return "Low Flood Risk"
