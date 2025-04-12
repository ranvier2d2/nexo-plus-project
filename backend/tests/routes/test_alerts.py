import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch
from datetime import datetime, timezone

from app.models import Patient, Measurement, Alert

# --- Tests for GET /patients/{patient_id}/alerts --- #

@pytest.mark.anyio
@patch('app.routes.alerts.patients_db')
@patch('app.routes.alerts.notify_via_whatsapp', new_callable=AsyncMock)
async def test_get_alerts_no_alerts_generated(mock_notify: AsyncMock, mock_db: patch, client: AsyncClient):
    """Test GET /patients/{patient_id}/alerts when measurements don't trigger alerts."""
    # 1. Setup: Create a patient in patients_db (or mock it) with non-alerting measurements.
    test_patient_id = "patient_normal"
    test_patient = Patient(
        id=test_patient_id,
        nombre="Normal Nancy",
        edad=65,
        telefono="1234567890",
        measurements=[
            Measurement(
                timestamp=datetime.now(timezone.utc),
                peso=70.0,
                presion_sistolica=120.0,
                presion_diastolica=80.0,
                frecuencia_cardiaca=70.0,
                sintomas=[]
            )
        ]
    )
    mock_db.get.return_value = test_patient

    # 2. Mock: Patch ai_service.generate_alert_message and ai_service.send_whatsapp_message (optional, but good practice).
    #    notify_via_whatsapp is already patched.

    # 3. Action: Call GET /patients/{patient_id}/alerts.
    response = client.get(f"/patients/{test_patient_id}/alerts")

    # 4. Assert: Status code 200, response body is an empty list [].
    assert response.status_code == 200
    assert response.json() == []

    # 5. Assert: Mocked notification methods were NOT called.
    mock_db.get.assert_called_once_with(test_patient_id)
    mock_notify.assert_not_called()

@pytest.mark.anyio
@patch('app.routes.alerts.patients_db') # Mock the database dictionary
@patch('app.routes.alerts.notify_via_whatsapp', new_callable=AsyncMock) # Mock the notification function
async def test_get_alerts_yellow_alert_generated(mock_notify: AsyncMock, mock_db: patch, client: AsyncClient):
    """Test GET /patients/{patient_id}/alerts generates a yellow alert (no notification)."""
    # 1. Setup: Create patient with measurements triggering a yellow alert (e.g., weight gain).
    test_patient_id = "patient_yellow"
    initial_weight = 70.0
    current_weight = 73.0 # > initial_weight + 2.0 (assuming peso_delta=2.0)
    delta_peso = current_weight - initial_weight

    test_patient = Patient(
        id=test_patient_id,
        nombre="Yancy Yellow",
        edad=68,
        telefono="0987654321",
        measurements=[
            Measurement( # First measurement for comparison
                timestamp=datetime(2024, 1, 1, 10, 0, 0, tzinfo=timezone.utc),
                peso=initial_weight,
                presion_sistolica=125.0,
                presion_diastolica=82.0,
                frecuencia_cardiaca=75.0,
                sintomas=[]
            ),
            Measurement( # Latest measurement triggering yellow alert
                timestamp=datetime.now(timezone.utc),
                peso=current_weight,
                presion_sistolica=128.0, # Normal
                presion_diastolica=85.0, # Normal
                frecuencia_cardiaca=78.0, # Normal
                sintomas=[]
            )
        ]
    )
    mock_db.get.return_value = test_patient

    # 2. Mock: Patch notification methods.
    #    notify_via_whatsapp is already patched.

    # 3. Action: Call GET /patients/{patient_id}/alerts.
    response = client.get(f"/patients/{test_patient_id}/alerts")

    # 4. Assert: Status code 200, response body contains the expected yellow alert.
    assert response.status_code == 200
    alerts_data = response.json()
    assert len(alerts_data) == 1
    expected_alert = Alert(
        mensaje=f"Recent weight increase of {delta_peso:.1f} kg detected (compared to last measurement). Check for fluid retention.",
        nivel="yellow"
    ).model_dump() # Use model_dump() for comparison if Alert model is used
    # Compare relevant fields, ignore timestamp if it's auto-generated in Alert model
    assert alerts_data[0]["mensaje"] == expected_alert["mensaje"]
    assert alerts_data[0]["nivel"] == expected_alert["nivel"]

    # 5. Assert: Mocked notification methods were NOT called.
    mock_db.get.assert_called_once_with(test_patient_id)
    mock_notify.assert_not_called()

@pytest.mark.anyio
@patch('app.routes.alerts.patients_db') # Mock the database dictionary
@patch('app.routes.alerts.notify_via_whatsapp', new_callable=AsyncMock) # Mock the WhatsApp notification function
async def test_get_alerts_red_alert_triggers_notification(mock_notify: AsyncMock, mock_db: patch, client: AsyncClient):
    """
    Test GET /patients/{patient_id}/alerts returns a red alert and triggers notification.
    
    Creates a patient with high systolic blood pressure to simulate a red alert scenario.
    Verifies that the endpoint returns the expected red alert message, the notification function
    is called with the correct parameters, and the patient's intervention history is updated.
    """
    # 1. Setup: Create patient (with phone number) and measurements triggering a red alert (e.g., high BP).
    test_patient_id = "patient_red"
    high_systolic_bp = 190.0 # Assuming clinical_params.pa_max = 180.0
    test_patient = Patient(
        id=test_patient_id,
        nombre="Roger Red",
        edad=70,
        telefono="5551234567", # Ensure phone number exists for notification
        measurements=[
            Measurement(
                timestamp=datetime.now(timezone.utc),
                peso=75.0,
                presion_sistolica=high_systolic_bp,
                presion_diastolica=95.0,
                frecuencia_cardiaca=80.0,
                sintomas=[]
            )
        ],
        intervention_history=[] # Start with empty history
    )
    mock_db.get.return_value = test_patient

    # Define the expected alert object based on the high BP
    expected_alert = Alert(
        mensaje=f"Elevated systolic pressure: {high_systolic_bp} mmHg.",
        nivel="red"
    )

    # 2. Mock: Patch ai_service.generate_alert_message and ai_service.send_whatsapp_message (optional, but good practice).
    #    notify_via_whatsapp is already patched.

    # 3. Action: Call GET /patients/{patient_id}/alerts.
    response = client.get(f"/patients/{test_patient_id}/alerts")

    # 4. Assert: Status code 200, response body contains the expected red alert.
    assert response.status_code == 200
    alerts_data = response.json()
    assert len(alerts_data) == 1
    # Compare relevant fields, ignore timestamp if Alert model auto-generates it
    assert alerts_data[0]["mensaje"] == expected_alert.mensaje
    assert alerts_data[0]["nivel"] == expected_alert.nivel

    # 5 & 6. Assert: Mocked notify_via_whatsapp was called correctly.
    mock_db.get.assert_called_once_with(test_patient_id)
    # Need to compare the actual Alert object passed to the mock
    mock_notify.assert_called_once()
    call_args, call_kwargs = mock_notify.call_args
    assert call_args[0] == test_patient # Check patient object
    assert len(call_args[1]) == 1 # Check list of alerts
    assert call_args[1][0].mensaje == expected_alert.mensaje # Check alert content
    assert call_args[1][0].nivel == expected_alert.nivel # Check alert level

    # 7. Assert: Patient's intervention_history was updated in patients_db (or mock assertion).
    # Access the patient object returned by the mock to check its state after the call
    assert len(test_patient.intervention_history) == 1
    history_entry = test_patient.intervention_history[0]
    assert history_entry["action"] == "AI-generated WhatsApp notification sent"
    assert history_entry["alerts"] == expected_alert.mensaje
    # We might also want to assert the timestamp format/existence if needed

@pytest.mark.anyio
@patch('app.routes.alerts.patients_db') # Mock the database dictionary
async def test_get_alerts_patient_not_found(mock_db: patch, client: AsyncClient):
    """Test GET /patients/{patient_id}/alerts for a non-existent patient."""
    # 1. Setup: Ensure patient ID does not exist in patients_db (or mock .get to return None).
    non_existent_id = "ghost_patient"
    mock_db.get.return_value = None

    # 2. Action: Call GET /patients/non_existent_id/alerts.
    response = client.get(f"/patients/{non_existent_id}/alerts")

    # 3. Assert: Status code 404.
    assert response.status_code == 404
    assert response.json() == {"detail": "Patient not found"}
    mock_db.get.assert_called_once_with(non_existent_id)

# --- Tests for GET /patients/{patient_id}/alerts/recommendations --- #

@pytest.mark.anyio
@patch('app.routes.alerts.patients_db') # Mock the database
@patch('app.routes.alerts.ai_service', new_callable=AsyncMock) # Mock the AI service instance
async def test_get_adherence_recommendations_success(mock_ai_service: AsyncMock, mock_db: patch, client: AsyncClient):
    """Test GET /patients/{patient_id}/alerts/recommendations successfully."""
    # 1. Setup: Create a patient in patients_db.
    test_patient_id = "patient_rec"
    test_patient = Patient(
        id=test_patient_id,
        nombre="Recommend Rachel",
        edad=60
        # Other fields like measurements aren't strictly needed if AI service is mocked
    )
    mock_db.get.return_value = test_patient

    # 2. Mock: Patch ai_service.generate_adherence_recommendations to return a predefined dict.
    mock_recommendations = {
        "medication": "Remember to take your beta-blocker.",
        "diet": "Reduce salt intake.",
        "activity": "Try a short walk today."
    }
    # Set the return value for the specific method on the mocked service instance
    mock_ai_service.generate_adherence_recommendations = AsyncMock(return_value=mock_recommendations)

    # 3. Action: Call GET /patients/{patient_id}/alerts/recommendations.
    response = client.get(f"/patients/{test_patient_id}/alerts/recommendations")

    # 4. Assert: Status code 200, response body matches the mocked recommendations.
    assert response.status_code == 200
    assert response.json() == mock_recommendations

    # 5. Assert: Mocked ai_service.generate_adherence_recommendations was called correctly.
    mock_db.get.assert_called_once_with(test_patient_id)
    mock_ai_service.generate_adherence_recommendations.assert_called_once_with(test_patient)

@pytest.mark.anyio
@patch('app.routes.alerts.patients_db') # Mock the database
async def test_get_adherence_recommendations_patient_not_found(mock_db: patch, client: AsyncClient):
    """Test GET /patients/{patient_id}/alerts/recommendations for a non-existent patient."""
    # 1. Setup: Ensure patient ID does not exist in patients_db.
    non_existent_id = "ghost_patient_rec"
    mock_db.get.return_value = None

    # 2. Action: Call GET /patients/non_existent_id/alerts/recommendations.
    response = client.get(f"/patients/{non_existent_id}/alerts/recommendations")

    # 3. Assert: Status code 404.
    assert response.status_code == 404
    assert response.json() == {"detail": "Patient not found"}
    mock_db.get.assert_called_once_with(non_existent_id)

# Add more tests as needed, e.g., specific alert conditions, AI service error handling
