from fastapi import APIRouter
from datetime import datetime, timezone as tz

router = APIRouter(tags=["System"])

@router.get("/health", 
            description="Health check endpoint")
async def health_check():
    """
    Simple health check endpoint to verify API is running.

    Returns:
        dict: Status information
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now(tz.utc).isoformat(),
        "version": "1.0.0"  # Consider making version dynamic later
    }
