from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Dict, Optional
from datetime import datetime
import requests
import os

from app.models import Patient, Alert
from app.routes.patients import patients_db
from app.services.clinical_parameters import clinical_params
from app.services.ai_service import ai_service

router = APIRouter(prefix="/patients/{patient_id}/alerts", tags=["Alerts"])

def check_alerts(patient: Patient) -> List[Alert]:
    """
    Evaluates patient measurements to generate alerts based on clinical parameters.

    Args:
        patient: Patient object with measurements

    Returns:
        List[Alert]: List of Alert objects
    """
    alerts = []
    if not patient.measurements:
        return alerts
    
    latest = patient.measurements[-1]
    
    # Weight change comparison
    if len(patient.measurements) > 1:
        peso_inicial = patient.measurements[0].peso
        delta_peso = latest.peso - peso_inicial
        if delta_peso > clinical_params.peso_delta:
            alerts.append(Alert(
                mensaje=f"Weight increase of {delta_peso:.1f} kg detected. Check for fluid retention.",
                nivel="yellow"
            ))
    
    # Blood pressure check
    if latest.presion_sistolica < clinical_params.pa_min:
        alerts.append(Alert(
            mensaje=f"Low systolic pressure: {latest.presion_sistolica} mmHg.",
            nivel="red"
        ))
    elif latest.presion_sistolica > clinical_params.pa_max:
        alerts.append(Alert(
            mensaje=f"Elevated systolic pressure: {latest.presion_sistolica} mmHg.",
            nivel="red"
        ))
    
    # Heart rate check
    if latest.frecuencia_cardiaca > clinical_params.fc_max:
        alerts.append(Alert(
            mensaje=f"Elevated heart rate: {latest.frecuencia_cardiaca} bpm.",
            nivel="red"
        ))
    elif latest.frecuencia_cardiaca < clinical_params.fc_min:
        alerts.append(Alert(
            mensaje=f"Low heart rate: {latest.frecuencia_cardiaca} bpm.",
            nivel="red"
        ))
    
    # Critical symptom evaluation
    if latest.sintomas:
        sintomas_norm = [s.lower() for s in latest.sintomas]
        if "dolor torácico" in sintomas_norm or "chest pain" in sintomas_norm:
            alerts.append(Alert(
                mensaje="Chest pain detected. Evaluate possible ischemia.",
                nivel="red"
            ))
        if "disnea" in sintomas_norm or "shortness of breath" in sintomas_norm:
            alerts.append(Alert(
                mensaje="Dyspnea reported. Check for possible congestion signs.",
                nivel="yellow"
            ))
    
    return alerts

async def notify_via_whatsapp(patient: Patient, alerts: List[Alert]):
    """
    Sends a critical alert notification using the AI service and WhatsApp.
    
    Uses LiteLLM to generate a personalized message based on patient data and alerts,
    then sends it via WhatsApp Cloud API.

    Args:
        patient: Patient object
        alerts: List of Alert objects that triggered the notification
    """
    if not patient.telefono:
        print("Patient has no registered phone number.")
        return
    
    # Generate personalized message using AI
    message = await ai_service.generate_alert_message(patient, alerts)
    
    # Send message via WhatsApp
    success = await ai_service.send_whatsapp_message(patient.telefono, message)
    
    if success:
        print(f"AI-generated WhatsApp notification sent to {patient.telefono}")
    else:
        print(f"Failed to send AI-generated WhatsApp notification")

@router.get("", response_model=List[Alert], description="Get clinical alerts generated from patient measurements")
async def get_alerts(patient_id: str):
    """
    Returns alerts generated by a patient's measurements.
    If critical alerts (red level) exist, an AI-generated WhatsApp notification is sent
    and the action is recorded in the intervention history.

    Args:
        patient_id: Patient identifier

    Returns:
        List[Alert]: List of Alert objects

    Raises:
        HTTPException: If patient is not found
    """
    patient = patients_db.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    alerts = check_alerts(patient)
    
    if any(a.nivel == "red" for a in alerts):
        await notify_via_whatsapp(patient, alerts)
        patient.intervention_history.append({
            "timestamp": datetime.utcnow().isoformat(),
            "action": "AI-generated WhatsApp notification sent",
            "alerts": "; ".join([a.mensaje for a in alerts])
        })
    
    return alerts

@router.get("/recommendations", response_model=Dict[str, str], 
            description="Get AI-generated adherence recommendations for a patient")
async def get_adherence_recommendations(patient_id: str):
    """
    Generates personalized adherence recommendations for a patient using AI.
    
    Args:
        patient_id: Patient identifier
        
    Returns:
        Dict[str, str]: Dictionary with different types of recommendations
        
    Raises:
        HTTPException: If patient is not found
    """
    patient = patients_db.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    recommendations = await ai_service.generate_adherence_recommendations(patient)
    return recommendations
