from app.llm_chat import llm_response
from fastapi import FastAPI
from pydantic import BaseModel
from app.flood_logic import predict_flood_risk
from fastapi.middleware.cors import CORSMiddleware
from app.soil_moisture import get_smap_soil_moisture
from app.thingsboard import push_soil_moisture_to_tb

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Location(BaseModel):
    latitude: float
    longitude: float

@app.get("/")
def root():
    return {"message": "Flood Prediction Backend Running"}

@app.post("/predict-flood")
def predict_flood(location: Location):
    risk = predict_flood_risk(location.latitude, location.longitude)
    return {
        "latitude": location.latitude,
        "longitude": location.longitude,
        "flood_risk": risk
    }
class ChatQuery(BaseModel):
    question: str
    flood_risk: str
    latitude: float
    longitude: float


@app.post("/chat")
def chat_bot(query: ChatQuery):
    answer = llm_response(
        query.question,
        query.flood_risk,
        query.latitude,
        query.longitude
    )

    return {"answer": answer}

@app.post("/soil-moisture")
def soil_moisture(location: Location):
    data = get_smap_soil_moisture(location.latitude, location.longitude)
    push_soil_moisture_to_tb(data)

    return {
        "latitude": location.latitude,
        "longitude": location.longitude,
        "soil_moisture": data["soil_moisture"],
        "status": data["status"]
    }
