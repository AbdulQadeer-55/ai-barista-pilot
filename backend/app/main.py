# In backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .logic import simulate_pairing # Import our new logic

# 1. Initialize the FastAPI app
app = FastAPI()

# 2. Set up CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://ai-barista-pilot.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define the data model for the request
class CoffeeRequest(BaseModel):
    coffee_id: str

# 4. Define the API endpoint
@app.post("/generate-pairing")
def get_pairing(request: CoffeeRequest):
    print(f"Received request for coffee: {request.coffee_id}")
    pairing_data = simulate_pairing(request.coffee_id)
    return pairing_data

# 5. A simple root endpoint to check if the server is running
@app.get("/")
def read_root():
    return {"status": "AI Barista Pilot API is running"}