from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.models import Patient
from app.routes.patients import patients_db
from app.routes import patients, measurements, alerts, guidelines, ingestion, system

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Nexo+ API",
    description="Backend API for Nexo+ cardiac care platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(patients.router)
app.include_router(measurements.router)
app.include_router(alerts.router)
app.include_router(guidelines.router)
app.include_router(ingestion.router)
app.include_router(system.router)

# Temporary endpoint for demo purposes - REMOVE AFTER DEMO
@app.post("/debug/patients", status_code=201, tags=["Debug"], include_in_schema=False)
async def add_debug_patient(patient: Patient):
    """Adds or updates a patient in the in-memory DB for debugging/demo."""
    patients_db[patient.id] = patient
    return {"message": f"Patient {patient.id} added/updated for debug."}

# Main entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
