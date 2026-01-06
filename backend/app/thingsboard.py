import requests

THINGSBOARD_URL = "https://demo.thingsboard.io"
DEVICE_TOKEN = "SMAP_Soil_Moisture_Device"

def push_soil_moisture_to_tb(moisture_data):
    url = f"{THINGSBOARD_URL}/api/v1/{DEVICE_TOKEN}/telemetry"
    headers = {"Content-Type": "application/json"}

    payload = {
        "soil_moisture": moisture_data["soil_moisture"],
        "soil_status": moisture_data["status"]
    }

    requests.post(url, json=payload, headers=headers)
