#app/main.py contains FastAPI app.
#an endpoint that accepts input features, processes them, and makes predictions using the model.
#uvicorn app.main:app --reload

from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from app.model import load_model, predict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
model = load_model()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    ph: float
    Hardness: float
    Solids: float
    Chloramines: float
    Sulfate: float
    Conductivity: float
    Organic_carbon: float
    Trihalomethanes: float
    Turbidity: float

@app.post("/predict")
async def make_prediction(data: InputData):
    input_features = np.array([[data.ph, data.Hardness, data.Solids,
                                data.Chloramines, data.Sulfate, data.Conductivity,
                                data.Organic_carbon, data.Trihalomethanes, data.Turbidity]])
    prediction = predict(model, input_features)
    return {"prediction": int(prediction[0])}
