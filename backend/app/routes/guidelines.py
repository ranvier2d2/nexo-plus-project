from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Dict, Optional
from datetime import datetime

from app.models import Patient, GuidelineParameters, GuidelineParameterUpdate 
from app.routes.patients import patients_db
from app.services.ai_service import ai_service
from app.services.clinical_parameters import clinical_params

router = APIRouter(tags=["Guidelines"])

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

def generate_followup_schedule(patient_id: str) -> Dict[str, str]:
    """
    Generates a post-discharge follow-up plan based on patient measurements and alerts.

    Args:
        patient_id: Patient identifier

    Returns:
        Dict[str, str]: Dictionary with follow-up plan
        
    Raises:
        HTTPException: If patient is not found
    """
    from app.routes.alerts import check_alerts
    
    patient = patients_db.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    alerts = check_alerts(patient)
    
    if any(a.nivel == "red" for a in alerts):
        schedule = "Urgent check-up in 7 days; intensive follow-up."
    else:
        schedule = "First check-up in 7-14 days; then monthly check-ups for 3 months and every 3-6 months based on stability."
    
    return {"followup_schedule": schedule}

parameters_audit_log: List[Dict[str, str]] = []

@router.get("/guidelines/clinical", response_model=Dict[str, str], 
         description="Get clinical guidelines according to the indicated source (AHA or GES)")
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

@router.get("/guidelines/interpret", response_model=Dict[str, str],
         description="Get AI interpretation of clinical guidelines based on a query")
async def interpret_guidelines(
    source: str = Query(..., description="Guidelines source (AHA or GES)"),
    query: str = Query(..., description="Question about the guidelines")
):
    """
    Uses AI to interpret clinical guidelines based on a specific query.
    
    Args:
        source: Source of guidelines ('AHA' or 'GES')
        query: User's question about the guidelines
        
    Returns:
        Dict[str, str]: Dictionary with source, query, and AI interpretation
    """
    interpretation = await ai_service.interpret_clinical_guidelines(source, query)
    
    return {
        "source": source.upper(),
        "query": query,
        "interpretation": interpretation
    }

@router.get("/guidelines/followup/{patient_id}", response_model=Dict[str, str], 
         description="Get post-discharge follow-up plan based on patient's clinical status")
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
    return generate_followup_schedule(patient_id)

@router.get("/parameters", response_model=GuidelineParameters, 
         description="Get current clinical parameters used for alert generation")
async def get_parameters():
    """
    Returns the current clinical parameters used for alert generation.

    Returns:
        GuidelineParameters: Current clinical parameters
    """
    return clinical_params

@router.put("/parameters", response_model=GuidelineParameters, 
         description="Update clinical parameters used for alert generation")
async def update_parameters(params_update: GuidelineParameterUpdate):
    """
    Updates clinical parameters and logs the change.

    Args:
        params_update: Parameter update data using GuidelineParameterUpdate model

    Returns:
        GuidelineParameters: Updated clinical parameters
    """
    audit_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "updated_by": params_update.updated_by,
        "previous_values": clinical_params.dict(),
        "new_values": {}
    }
    
    update_dict = params_update.dict(exclude_unset=True, exclude={"updated_by"})
    
    for key, value in update_dict.items():
        if hasattr(clinical_params, key) and value is not None: 
            setattr(clinical_params, key, value)
            audit_entry["new_values"][key] = value
        else:
            print(f"Warning: Attempted to update non-existent parameter '{key}'") 

    if audit_entry["new_values"]:
        parameters_audit_log.append(audit_entry)
    
    return clinical_params

@router.get("/parameters/audit", response_model=List[Dict[str, str]], 
         description="Get audit log of parameter updates")
async def get_parameters_audit():
    """
    Returns the audit log of clinical parameter updates.

    Returns:
        List[Dict[str, str]]: List of audit log entries
    """
    return parameters_audit_log
