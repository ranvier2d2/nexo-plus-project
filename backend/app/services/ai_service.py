import os
from typing import List, Dict, Optional
import requests
from litellm import completion
from dotenv import load_dotenv

from app.models import Patient, Alert

# Load environment variables
load_dotenv()

class AIService:
    """
    Service for AI-powered features using LiteLLM.
    """
    
    def __init__(self):
        """
        Initialize the AI service with API keys and configuration.
        """
        self.api_key = os.environ.get("OPENAI_API_KEY")
        self.model = os.environ.get("LLM_MODEL", "gpt-3.5-turbo")
        self.whatsapp_phone_id = os.environ.get("WHATSAPP_PHONE_ID")
        self.whatsapp_token = os.environ.get("WHATSAPP_TOKEN")
    
    async def generate_alert_message(self, patient: Patient, alerts: List[Alert]) -> str:
        """
        Generate a personalized alert message for the patient based on their data and alerts.
        
        Args:
            patient: Patient object
            alerts: List of Alert objects
        
        Returns:
            str: Personalized alert message
        """
        # Extract relevant patient information
        patient_info = {
            "name": patient.nombre,
            "age": patient.edad,
            "latest_measurement": patient.measurements[-1] if patient.measurements else None
        }
        
        # Extract alert information
        alert_info = [{"message": alert.mensaje, "level": alert.nivel} for alert in alerts]
        
        # Create prompt for the LLM
        prompt = f"""
        You are a medical assistant for Nexo+, a platform that helps cardiac patients after discharge.
        
        Patient information:
        - Name: {patient_info['name']}
        - Age: {patient_info['age']}
        
        The following alerts have been detected:
        {', '.join([f"{a['message']} (Level: {a['level']})" for a in alert_info])}
        
        Generate a personalized, empathetic WhatsApp message for this patient that:
        1. Clearly communicates the medical concern without causing panic
        2. Provides specific, actionable advice based on the alerts
        3. Encourages the patient to contact their healthcare provider if needed
        4. Is written in a warm, supportive tone
        5. Is concise (maximum 3-4 sentences)
        
        The message should be in Spanish, as this is for patients in Chile.
        """
        
        try:
            response = completion(
                model=self.model,
                messages=[{"role": "system", "content": prompt}],
                max_tokens=300
            )
            
            message = response.choices[0].message.content.strip()
            return message
        except Exception as e:
            print(f"Error generating alert message: {e}")
            # Fallback message if AI generation fails
            return f"ALERTA: {', '.join([a.mensaje for a in alerts])}. Por favor contacte a su médico lo antes posible."
    
    async def send_whatsapp_message(self, phone_number: str, message: str) -> bool:
        """
        Send a WhatsApp message using the WhatsApp Cloud API.
        
        Args:
            phone_number: Recipient's phone number
            message: Message content
        
        Returns:
            bool: True if message was sent successfully, False otherwise
        """
        if not self.whatsapp_phone_id or not self.whatsapp_token:
            print("Missing WhatsApp API configuration")
            return False
        
        url = f"https://graph.facebook.com/v14.0/{self.whatsapp_phone_id}/messages"
        headers = {
            "Authorization": f"Bearer {self.whatsapp_token}",
            "Content-Type": "application/json"
        }
        
        data = {
            "messaging_product": "whatsapp",
            "to": phone_number,
            "type": "text",
            "text": {
                "body": message
            }
        }
        
        try:
            response = requests.post(url, headers=headers, json=data)
            if response.status_code in [200, 201]:
                print(f"WhatsApp message sent to {phone_number}")
                return True
            else:
                print(f"Error sending WhatsApp message: {response.status_code}, {response.text}")
                return False
        except Exception as e:
            print(f"Exception during WhatsApp API call: {e}")
            return False
    
    async def interpret_clinical_guidelines(self, source: str, query: str) -> str:
        """
        Interpret clinical guidelines based on a user query.
        
        Args:
            source: Source of guidelines ('AHA' or 'GES')
            query: User's question about the guidelines
        
        Returns:
            str: AI-generated interpretation of the guidelines
        """
        # Get the appropriate guidelines based on source
        guidelines = self._get_guidelines_content(source)
        
        # Create prompt for the LLM
        prompt = f"""
        You are a medical AI assistant specializing in cardiac care guidelines.
        
        The following are the {source} guidelines for post-myocardial infarction care:
        
        {guidelines}
        
        User question: {query}
        
        Please provide a clear, accurate answer based specifically on these guidelines.
        If the guidelines don't address the question directly, acknowledge this and provide
        general information based on the guidelines' overall approach.
        
        Your answer should be:
        1. Medically accurate and based on the guidelines
        2. Easy to understand for healthcare providers
        3. Concise but comprehensive
        4. Include specific recommendations from the guidelines when applicable
        """
        
        try:
            response = completion(
                model=self.model,
                messages=[{"role": "system", "content": prompt}],
                max_tokens=500
            )
            
            interpretation = response.choices[0].message.content.strip()
            return interpretation
        except Exception as e:
            print(f"Error interpreting clinical guidelines: {e}")
            return f"Lo siento, no pude interpretar las guías clínicas de {source} en este momento. Por favor, consulte directamente las guías oficiales."
    
    async def generate_adherence_recommendations(self, patient: Patient) -> Dict[str, str]:
        """
        Generate personalized adherence recommendations based on patient data.
        
        Args:
            patient: Patient object
        
        Returns:
            Dict[str, str]: Dictionary with different types of recommendations
        """
        # Extract relevant patient information
        measurements = patient.measurements
        has_measurements = len(measurements) > 0
        
        # Create context for the LLM
        context = {
            "name": patient.nombre,
            "age": patient.edad,
            "has_measurements": has_measurements
        }
        
        if has_measurements:
            latest = measurements[-1]
            context["latest_weight"] = latest.peso
            context["latest_bp"] = f"{latest.presion_sistolica}/{latest.presion_diastolica}"
            context["latest_hr"] = latest.frecuencia_cardiaca
            context["symptoms"] = latest.sintomas if latest.sintomas else []
        
        # Create prompt for the LLM
        prompt = f"""
        You are a cardiac care specialist helping patients after myocardial infarction.
        
        Patient information:
        - Name: {context['name']}
        - Age: {context['age']}
        """
        
        if has_measurements:
            prompt += f"""
            - Latest measurements:
              - Weight: {context['latest_weight']} kg
              - Blood pressure: {context['latest_bp']} mmHg
              - Heart rate: {context['latest_hr']} bpm
            - Reported symptoms: {', '.join(context['symptoms']) if context['symptoms'] else 'None'}
            """
        
        prompt += """
        Generate personalized recommendations for this post-myocardial infarction patient in the following categories:
        1. Medication adherence
        2. Diet recommendations
        3. Physical activity
        4. Symptom monitoring
        
        Each category should have 2-3 specific, actionable recommendations that are evidence-based and aligned with AHA and GES guidelines for post-MI care.
        
        Format your response as a JSON-like structure with these categories as keys and the recommendations as values.
        The recommendations should be in Spanish, as this is for patients in Chile.
        """
        
        try:
            response = completion(
                model=self.model,
                messages=[{"role": "system", "content": prompt}],
                max_tokens=800
            )
            
            recommendations_text = response.choices[0].message.content.strip()
            
            # Parse the response into a dictionary
            # Note: In a production environment, you would want more robust parsing
            recommendations = {}
            current_category = None
            
            for line in recommendations_text.split('\n'):
                line = line.strip()
                if line.startswith('"') and ':' in line:
                    parts = line.split(':', 1)
                    category = parts[0].strip().strip('"').strip(':')
                    content = parts[1].strip().strip('"').strip(',')
                    recommendations[category] = content
            
            # Fallback if parsing fails
            if not recommendations:
                recommendations = {
                    "medicamentos": "Tome sus medicamentos según lo prescrito por su médico.",
                    "dieta": "Siga una dieta baja en sodio y grasas saturadas.",
                    "actividad_fisica": "Realice actividad física moderada según las recomendaciones de su médico.",
                    "monitoreo": "Registre sus síntomas y mediciones regularmente en la aplicación Nexo+."
                }
            
            return recommendations
        except Exception as e:
            print(f"Error generating adherence recommendations: {e}")
            # Fallback recommendations if AI generation fails
            return {
                "medicamentos": "Tome sus medicamentos según lo prescrito por su médico.",
                "dieta": "Siga una dieta baja en sodio y grasas saturadas.",
                "actividad_fisica": "Realice actividad física moderada según las recomendaciones de su médico.",
                "monitoreo": "Registre sus síntomas y mediciones regularmente en la aplicación Nexo+."
            }
    
    def _get_guidelines_content(self, source: str) -> str:
        """
        Get the content of clinical guidelines based on source.
        
        Args:
            source: Source of guidelines ('AHA' or 'GES')
        
        Returns:
            str: Guidelines content
        """
        if source.lower() == "aha":
            return """
            AHA: Post-AMI Recommendations:
            • BP <130/80 mmHg (minimum <140/90).
            • Beta-blockers: HR 50-70 bpm, prolonged use based on condition.
            • LDL <70 mg/dL; consider additional therapies if 55–69 mg/dL.
            • HbA1c ~7% in diabetics.
            • Echocardiogram 6–12 weeks; consider ICD if LVEF ≤35%.
            • Intensive initial follow-up.
            • Dual antiplatelet therapy for at least 12 months.
            • ACE inhibitors or ARBs for patients with LVEF <40%.
            • Statins for all patients regardless of baseline LDL levels.
            • Cardiac rehabilitation program enrollment.
            • Smoking cessation counseling and support.
            • Depression screening and treatment if needed.
            • Regular follow-up visits: 2 weeks, 1 month, 3 months, 6 months, and 1 year.
            """
        elif source.lower() == "ges":
            return """
            GES (Chile): Post-AMI/HF Recommendations:
            • First check-up in 7–14 days; initial monthly check-ups, spaced after stabilization.
            • Early cardiac rehabilitation (minimum 15 sessions in 2 months).
            • Focus on adherence, low-sodium diet, and moderate activity.
            • Education in self-care and symptom awareness.
            • Guaranteed access to medications through GES program.
            • Echocardiogram within first month post-discharge.
            • Stress test before 3 months if indicated.
            • Psychological support for patients and families.
            • Nutritional counseling with focus on Mediterranean diet.
            • Smoking cessation program enrollment.
            • Regular monitoring of blood pressure, heart rate, and weight.
            • Alert system for early detection of decompensation signs.
            """
        else:
            return "Unrecognized source. Use 'AHA' or 'GES'."

# Create a singleton instance
ai_service = AIService()
