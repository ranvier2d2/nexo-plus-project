# Nexo+ Demo Script

This document provides a step-by-step guide for demonstrating the Nexo+ platform during the hackathon presentation.

## Setup Before Presentation
1. Ensure the backend server is running: `cd backend && python -m uvicorn app.main:app --reload`
2. Ensure the frontend is running: `cd frontend && npm run dev`
3. Have the browser open with the Nexo+ dashboard loaded
4. Prepare a test patient with recent measurements and alerts

## Demo Flow (45 seconds total)

### 1. Dashboard Overview (15 seconds)
- "Here's our Nexo+ dashboard, showing real-time patient monitoring"
- Point out the key statistics: total patients, active alerts, adherence rate
- Highlight the recent alerts section showing patients needing attention

### 2. Patient Detail View (15 seconds)
- Click on a patient with an alert
- "Let's look at María González, who has a critical alert for elevated blood pressure"
- Show the patient's measurement history and the AI-generated recommendations
- Point out how the system detected the abnormal pattern

### 3. AI-Powered Alerts (15 seconds)
- "When a critical alert is detected, our AI generates a personalized message"
- Show the WhatsApp notification preview
- "This message is automatically sent to the patient with specific recommendations"
- Highlight how the message is tailored to the patient's specific condition

## Key Points to Emphasize
- The real-time nature of the monitoring
- The AI-powered personalization
- The seamless integration between monitoring and intervention
- The user-friendly interface for both healthcare providers and patients

## Contingency Plan
If technical issues arise during the demo:
- Have screenshots prepared of each key screen
- Be ready to describe the functionality verbally
- Focus on the problem-solution fit rather than technical details
