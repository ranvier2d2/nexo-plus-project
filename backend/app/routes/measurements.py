from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Dict, Optional
from datetime import datetime

from app.models import Patient, Measurement, Alert
from app.routes.patients import patients_db

router = APIRouter(prefix="/patients/{patient_id}/measurements", tags=["Measurements"])

@router.post("", response_model=Measurement, description="Add a new measurement to a patient's history")
async def add_measurement(patient_id: str, measurement: Measurement):
    """
    Adds a clinical measurement to a patient's history.

    Args:
        patient_id: Patient identifier
        measurement: Measurement data

    Returns:
        Measurement: Added Measurement object

    Raises:
        HTTPException: If patient is not found
    """
    patient = patients_db.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    patient.measurements.append(measurement)
    return measurement

@router.get("", response_model=List[Measurement], description="List a patient's recorded measurements")
async def get_measurements(patient_id: str):
    """
    Returns the measurement history for a specific patient.

    Args:
        patient_id: Patient identifier

    Returns:
        List[Measurement]: List of Measurement objects

    Raises:
        HTTPException: If patient is not found
    """
    patient = patients_db.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    return patient.measurements

@router.get("/latest", response_model=Optional[Measurement], description="Get the most recent measurement for a patient")
async def get_latest_measurement(patient_id: str):
    """
    Returns the most recent measurement for a specific patient.

    Args:
        patient_id: Patient identifier

    Returns:
        Optional[Measurement]: Latest Measurement object or None if no measurements

    Raises:
        HTTPException: If patient is not found
    """
    patient = patients_db.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    if not patient.measurements:
        return None
    
    return patient.measurements[-1]
