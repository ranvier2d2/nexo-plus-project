from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Dict, Optional
from datetime import datetime

from app.models import TextIngestion, VisionIngestion

router = APIRouter(prefix="/ingestion", tags=["Data Ingestion"])

# In-memory storage for ingestion data
ingested_text_data: List[TextIngestion] = []
ingested_vision_data: List[VisionIngestion] = []

@router.post("/text", response_model=TextIngestion, description="Ingest text data")
async def ingest_text(text_data: TextIngestion):
    """
    Ingests text data into the system.

    Args:
        text_data: Text data to ingest

    Returns:
        TextIngestion: Ingested text data
    """
    ingested_text_data.append(text_data)
    return text_data

@router.post("/vision", response_model=VisionIngestion, description="Ingest visual data")
async def ingest_vision(vision_data: VisionIngestion):
    """
    Ingests visual data into the system.

    Args:
        vision_data: Visual data to ingest

    Returns:
        VisionIngestion: Ingested visual data
    """
    ingested_vision_data.append(vision_data)
    return vision_data

@router.get("/text", response_model=List[TextIngestion], description="Get all ingested text data")
async def get_text_ingestions():
    """
    Returns all ingested text data.

    Returns:
        List[TextIngestion]: List of ingested text data
    """
    return ingested_text_data

@router.get("/vision", response_model=List[VisionIngestion], description="Get all ingested visual data")
async def get_vision_ingestions():
    """
    Returns all ingested visual data.

    Returns:
        List[VisionIngestion]: List of ingested visual data
    """
    return ingested_vision_data
