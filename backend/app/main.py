from fastapi import FastAPI, HTTPException, Query, Body, Depends
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime
import uuid
import requests
import os
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

# =============================================================================
# MODELS
# =============================================================================

class Measurement(BaseModel):
    """
    Model representing a clinical measurement from a patient.
    """
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Date and time of measurement")
    peso: float = Field(..., description="Patient weight in kg")
    presion_sistolica: float = Field(..., description="Systolic blood pressure in mmHg")
    presion_diastolica: float = Field(..., description="Diastolic blood pressure in mmHg")
    frecuencia_cardiaca: float = Field(..., description="Heart rate in beats per minute (bpm)")
    sintomas: Optional[List[str]] = Field(default=None, description="List of symptoms reported by patient")

class Patient(BaseModel):
    """
    Model representing basic patient information.
    """
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), description="Unique patient identifier")
    nombre: str = Field(..., description="Patient's full name")
    edad: int = Field(..., description="Patient's age")
    telefono: Optional[str] = Field(None, description="Phone number for WhatsApp notifications")
    measurements: List[Measurement] = Field(default_factory=list, description="Patient's measurement history")
    intervention_history: List[Dict[str, str]] = Field(default_factory=list, description="Intervention history")

class Alert(BaseModel):
    """
    Model representing a clinical alert generated based on patient parameters.
    """
    mensaje: str = Field(..., description="Alert descriptive message")
    nivel: str = Field(..., description="Alert level (green, yellow, red)")

class GuidelineParameters(BaseModel):
    """
    Model for defining clinical parameters used in alert evaluation.
    """
    pa_min: Optional[float] = Field(90, description="Minimum recommended systolic blood pressure")
    pa_max: Optional[float] = Field(180, description="Maximum recommended systolic blood pressure")
    fc_min: Optional[float] = Field(50, description="Minimum recommended heart rate")
    fc_max: Optional[float] = Field(120, description="Maximum recommended heart rate")
    peso_delta: Optional[float] = Field(2, description="Weight increase (kg) indicating alert")

class GuidelineParameterUpdate(BaseModel):
    """
    Model for manual update of clinical parameters, with audit logging.
    """
    pa_min: Optional[float] = Field(None, description="New minimum value for systolic blood pressure")
    pa_max: Optional[float] = Field(None, description="New maximum value for systolic blood pressure")
    fc_min: Optional[float] = Field(None, description="New minimum value for heart rate")
    fc_max: Optional[float] = Field(None, description="New maximum value for heart rate")
    peso_delta: Optional[float] = Field(None, description="New threshold for weight increase")
    updated_by: str = Field(..., description="Identifier of user making the update")

# =============================================================================
# DATA INGESTION MODELS
# =============================================================================

class TextIngestion(BaseModel):
    """
    Model for text data ingestion.
    """
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), description="Unique ingestion identifier")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Ingestion date and time")
    content: str = Field(..., description="Text content entered")
    metadata: Optional[Dict[str, str]] = Field(default=None, description="Additional content metadata")

class VisionIngestion(BaseModel):
    """
    Model for ingestion of data including visual information.
    """
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), description="Unique ingestion identifier")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Ingestion date and time")
    image_url: Optional[str] = Field(None, description="Image URL or reference")
    caption: Optional[str] = Field(None, description="Visual description or interpretation of the image")
    additional_text: Optional[str] = Field(None, description="Additional text obtained via vision LLM")
    metadata: Optional[Dict[str, str]] = Field(default=None, description="Additional visual ingestion metadata")

# =============================================================================
# IN-MEMORY DATABASE AND AUDIT LOG
# =============================================================================

patients_db: Dict[str, Patient] = {}
clinical_params = GuidelineParameters()
parameters_audit_log: List[Dict[str, str]] = []  # Parameter update log

# In-memory storage for data ingestion
ingested_text_data: List[TextIngestion] = []
ingested_vision_data: List[VisionIngestion] = []

# =============================================================================
# PATIENT ENDPOINTS
# =============================================================================

@app.post("/patients", response_model=Patient, 
          description="Register a new patient in the system",
          tags=["Patients"])
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

@app.get("/patients", response_model=List[Patient], 
         description="Get all registered patients",
         tags=["Patients"])
async def get_all_patients():
    """
    Retrieves all patients from the database.

    Returns:
        List[Patient]: List of all registered patients
    """
    return list(patients_db.values())

@app.get("/patients/{patient_id}", response_model=Patient, 
         description="Get information for a specific patient",
         tags=["Patients"])
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

@app.put("/patients/{patient_id}", response_model=Patient, 
         description="Update patient information",
         tags=["Patients"])
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

@app.delete("/patients/{patient_id}", 
            description="Delete a patient from the system",
            tags=["Patients"])
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

# =============================================================================
# MEASUREMENT ENDPOINTS
# =============================================================================

@app.post("/patients/{patient_id}/measurements", response_model=Measurement, 
          description="Add a new measurement to a patient's history",
          tags=["Measurements"])
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

@app.get("/patients/{patient_id}/measurements", response_model=List[Measurement], 
         description="List a patient's recorded measurements",
         tags=["Measurements"])
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

@app.get("/patients/{patient_id}/measurements/latest", response_model=Optional[Measurement], 
         description="Get the most recent measurement for a patient",
         tags=["Measurements"])
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

# =============================================================================
# ALERT FUNCTIONS AND ENDPOINTS
# =============================================================================

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

@app.get("/patients/{patient_id}/alerts", response_model=List[Alert], 
         description="Get clinical alerts generated from patient measurements",
         tags=["Alerts"])
async def get_alerts(patient_id: str):
    """
    Returns alerts generated by a patient's measurements.
    If critical alerts (red level) exist, a WhatsApp notification is sent
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
            "action": "WhatsApp notification sent",
            "alerts": "; ".join([a.mensaje for a in alerts])
        })
    
    return alerts

# =============================================================================
# WHATSAPP NOTIFICATIONS
# =============================================================================

async def notify_via_whatsapp(patient: Patient, alerts: List[Alert]):
    """
    Sends a critical alert notification using the WhatsApp Cloud API.
    Requires WHATSAPP_PHONE_ID and WHATSAPP_TOKEN environment variables
    to be configured, and the patient to have a registered phone number.

    Args:
        patient: Patient object
        alerts: List of Alert objects that triggered the notification
    """
    phone_id = os.environ.get("WHATSAPP_PHONE_ID")
    token = os.environ.get("WHATSAPP_TOKEN")
    
    if not phone_id or not token or not patient.telefono:
        print("Missing configuration data or patient has no registered phone.")
        return
    
    url = f"https://graph.facebook.com/v14.0/{phone_id}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    mensaje = f"CRITICAL ALERT: {', '.join([a.mensaje for a in alerts])}"
    data = {
        "messaging_product": "whatsapp",
        "to": patient.telefono,
        "type": "text",
        "text": {
            "body": mensaje
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code in [200, 201]:
            print(f"WhatsApp notification sent to {patient.telefono}: {mensaje}")
        else:
            print(f"Error sending WhatsApp: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Exception during WhatsApp API call: {e}")

# =============================================================================
# CLINICAL GUIDELINES ENDPOINTS
# =============================================================================

def retrieve_clinical_guidelines(source: str) -> str:
    """
    Retrieves (simulates) clinical guidelines from a specified source (AHA or GES).

    Args:
        source: Guidelines source ('AHA' or 'GES')

    Returns:
        str: Text with clinical recommendations
    """
    if source.lower() == "aha":
        return (
            "AHA: Post-AMI Recommendations:\n"
            "• BP <130/80 mmHg (minimum <140/90).\n"
            "• Beta-blockers: HR 50-70 bpm, prolonged use based on condition.\n"
            "• LDL <70 mg/dL; consider additional therapies if 55–69 mg/dL.\n"
            "• HbA1c ~7% in diabetics.\n"
            "• Echocardiogram 6–12 weeks; consider ICD if LVEF ≤35%.\n"
            "• Intensive initial follow-up."
        )
    elif source.lower() == "ges":
        return (
            "GES (Chile): Post-AMI/HF Recommendations:\n"
            "• First check-up in 7–14 days; initial monthly check-ups, spaced after stabilization.\n"
            "• Early cardiac rehabilitation (minimum 15 sessions in 2 months).\n"
            "• Focus on adherence, low-sodium diet, and moderate activity.\n"
            "• Education in self-care and symptom awareness."
        )
    else:
        return "Unrecognized source. Use 'AHA' or 'GES'."

@app.get("/guidelines/clinical", response_model=Dict[str, str], 
         description="Get clinical guidelines according to the indicated source (AHA or GES)",
         tags=["Guidelines"])
async def get_clinical_guidelines(source: str = Query(..., description="Guidelines source (AHA or GES)")):
    """
    Endpoint to retrieve dynamic clinical guidelines according to source (AHA or GES).

    Args:
        source: Source to query

    Returns:
        Dict[str, str]: Dictionary with source and clinical guidelines
    """
    guidelines = retrieve_clinical_guidelines(source)
    return {"source": source.upper(), "guidelines": guidelines}

def generate_followup_schedule(patient: Patient) -> Dict[str, str]:
    """
    Generates a post-discharge follow-up plan based on patient measurements and alerts.

    Args:
        patient: Patient object

    Returns:
        Dict[str, str]: Dictionary with follow-up plan
    """
    alerts = check_alerts(patient)
    
    if any(a.nivel == "red" for a in alerts):
        schedule = "Urgent check-up in 7 days; intensive follow-up."
    else:
        schedule = "First check-up in 7-14 days; then monthly check-ups for 3 months and every 3-6 months based on stability."
    
    return {"followup_schedule": schedule}

@app.get("/guidelines/followup/{patient_id}", response_model=Dict[str, str], 
         description="Get post-discharge follow-up plan based on patient's clinical status",
         tags=["Guidelines"])
async def get_followup_plan(patient_id: str):
    """
    Generates a personalized follow-up plan based on the patient's clinical status.

    Args:
        patient_id: Patient identifier

    Returns:
        Dict[str, str]: Dictionary with follow-up plan

    Raises:
        HTTPException: If patient is not found
    """
    patient = patients_db.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    return generate_followup_schedule(patient)

# =============================================================================
# CLINICAL PARAMETERS ENDPOINTS
# =============================================================================

@app.get("/parameters", response_model=GuidelineParameters, 
         description="Get current clinical parameters used for alert generation",
         tags=["Parameters"])
async def get_parameters():
    """
    Returns the current clinical parameters used for alert generation.

    Returns:
        GuidelineParameters: Current clinical parameters
    """
    return clinical_params

@app.put("/parameters", response_model=GuidelineParameters, 
         description="Update clinical parameters used for alert generation",
         tags=["Parameters"])
async def update_parameters(params_update: GuidelineParameterUpdate):
    """
    Updates clinical parameters and logs the change.

    Args:
        params_update: Parameter update data

    Returns:
        GuidelineParameters: Updated clinical parameters
    """
    # Record the update in the audit log
    audit_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "updated_by": params_update.updated_by,
        "previous_values": clinical_params.dict(),
        "new_values": {}
    }
    
    # Update only the provided parameters
    update_dict = params_update.dict(exclude_unset=True, exclude={"updated_by"})
    
    for key, value in update_dict.items():
        if value is not None:
            setattr(clinical_params, key, value)
            audit_entry["new_values"][key] = value
    
    parameters_audit_log.append(audit_entry)
    
    return clinical_params

@app.get("/parameters/audit", response_model=List[Dict[str, str]], 
         description="Get audit log of parameter updates",
         tags=["Parameters"])
async def get_parameters_audit():
    """
    Returns the audit log of clinical parameter updates.

    Returns:
        List[Dict[str, str]]: List of audit log entries
    """
    return parameters_audit_log

# =============================================================================
# DATA INGESTION ENDPOINTS
# =============================================================================

@app.post("/ingestion/text", response_model=TextIngestion, 
          description="Ingest text data",
          tags=["Data Ingestion"])
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

@app.post("/ingestion/vision", response_model=VisionIngestion, 
          description="Ingest visual data",
          tags=["Data Ingestion"])
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

@app.get("/ingestion/text", response_model=List[TextIngestion], 
         description="Get all ingested text data",
         tags=["Data Ingestion"])
async def get_text_ingestions():
    """
    Returns all ingested text data.

    Returns:
        List[TextIngestion]: List of ingested text data
    """
    return ingested_text_data

@app.get("/ingestion/vision", response_model=List[VisionIngestion], 
         description="Get all ingested visual data",
         tags=["Data Ingestion"])
async def get_vision_ingestions():
    """
    Returns all ingested visual data.

    Returns:
        List[VisionIngestion]: List of ingested visual data
    """
    return ingested_vision_data

# =============================================================================
# HEALTH CHECK ENDPOINT
# =============================================================================

@app.get("/health", 
         description="Health check endpoint",
         tags=["System"])
async def health_check():
    """
    Simple health check endpoint to verify API is running.

    Returns:
        dict: Status information
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }

# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
