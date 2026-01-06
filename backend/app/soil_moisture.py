import random

def get_smap_soil_moisture(lat: float, lng: float):
    """
    Simulated SMAP soil moisture value (m³/m³)
    Typical SMAP range: 0.05 – 0.6
    """
    moisture = round(random.uniform(0.15, 0.45), 3)

    if moisture < 0.2:
        status = "Dry"
    elif moisture < 0.35:
        status = "Moderate"
    else:
        status = "High"

    return {
        "soil_moisture": moisture,
        "status": status
    }
