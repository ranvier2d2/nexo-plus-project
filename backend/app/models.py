from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime

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
    id: str = Field(..., description="Unique patient identifier")
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

class TextIngestion(BaseModel):
    """
    Model for text data ingestion.
    """
    id: Optional[str] = Field(None, description="Unique ingestion identifier")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Ingestion date and time")
    content: str = Field(..., description="Text content entered")
    metadata: Optional[Dict[str, str]] = Field(default=None, description="Additional content metadata")

class VisionIngestion(BaseModel):
    """
    Model for ingestion of data including visual information.
    """
    id: Optional[str] = Field(None, description="Unique ingestion identifier")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Ingestion date and time")
    image_url: Optional[str] = Field(None, description="Image URL or reference")
    caption: Optional[str] = Field(None, description="Visual description or interpretation of the image")
    additional_text: Optional[str] = Field(None, description="Additional text obtained via vision LLM")
    metadata: Optional[Dict[str, str]] = Field(default=None, description="Additional visual ingestion metadata")
