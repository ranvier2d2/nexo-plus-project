from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

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

# Import and include routers
from app.routes import patients, measurements, alerts, guidelines, ingestion

# Include routers
app.include_router(patients.router)
app.include_router(measurements.router)
app.include_router(alerts.router)
app.include_router(guidelines.router)
app.include_router(ingestion.router)

# Health check endpoint
@app.get("/health", tags=["System"], description="Health check endpoint")
async def health_check():
    """
    Simple health check endpoint to verify API is running.

    Returns:
        dict: Status information
    """
    from datetime import datetime
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "features": ["AI-powered alerts", "WhatsApp integration", "Clinical guideline interpretation"]
    }

# Main entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
