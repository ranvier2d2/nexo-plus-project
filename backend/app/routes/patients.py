from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Dict, Optional
from datetime import datetime

from app.models import Patient, Measurement, Alert, GuidelineParameters

router = APIRouter(prefix="/patients", tags=["Patients"])

# In-memory database simulation
patients_db = {}

@router.post("", response_model=Patient, description="Register a new patient in the system")
async def create_patient(patient: Patient):
    """
    Creates a new patient and stores it in the in-memory database.

    Args:
        patient: Patient data

    Returns:
        Patient: Registered Patient object
    """
    patients_db[patient.id] = patient
    return patient

@router.get("", response_model=List[Patient], description="Get all registered patients")
async def get_all_patients():
    """
    Retrieves all patients from the database.

    Returns:
        List[Patient]: List of all registered patients
    """
    return list(patients_db.values())

@router.get("/{patient_id}", response_model=Patient, description="Get information for a specific patient")
async def get_patient(patient_id: str):
    """
    Retrieves information for the patient identified by patient_id.

    Args:
        patient_id: Patient identifier

    Returns:
        Patient: Patient object

    Raises:
        HTTPException: If patient is not found
    """
    patient = patients_db.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.put("/{patient_id}", response_model=Patient, description="Update patient information")
async def update_patient(patient_id: str, patient_update: Patient):
    """
    Updates information for an existing patient.

    Args:
        patient_id: Patient identifier
        patient_update: Updated patient data

    Returns:
        Patient: Updated Patient object

    Raises:
        HTTPException: If patient is not found
    """
    if patient_id not in patients_db:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Preserve measurements and intervention history
    existing_measurements = patients_db[patient_id].measurements
    existing_interventions = patients_db[patient_id].intervention_history
    
    # Update patient with new data
    patients_db[patient_id] = patient_update
    
    # Restore measurements and interventions
    patients_db[patient_id].measurements = existing_measurements
    patients_db[patient_id].intervention_history = existing_interventions
    
    return patients_db[patient_id]

@router.delete("/{patient_id}", description="Delete a patient from the system")
async def delete_patient(patient_id: str):
    """
    Deletes a patient from the database.

    Args:
        patient_id: Patient identifier

    Returns:
        dict: Success message

    Raises:
        HTTPException: If patient is not found
    """
    if patient_id not in patients_db:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    del patients_db[patient_id]
    return {"message": "Patient deleted successfully"}
