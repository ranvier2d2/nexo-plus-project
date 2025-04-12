# Nexo+

Nexo+ is an AI-powered digital platform that supports patients discharged after acute myocardial infarction, specifically focusing on improving therapeutic adherence and preventing decompensation.

## Problem

In Chile, one in three patients hospitalized for heart failure could have avoided that admission if they had correctly followed their treatment. Poor adherence to medications and diet exceeds even infections and arrhythmias as a cause of decompensation. In particular, patients discharged after acute myocardial infarction face a critical risk: up to 30% abandon at least one key medication in the first 90 days, which can double or triple their risk of death and rehospitalization.

## Solution

Unlike traditional clinical support systems that support immediate diagnostic decisions, Nexo+ is oriented to facilitate continuity of care at home through remote monitoring of adherence (drugs, diet, exercise), early detection of warning signs, and effective coordination between the patient and their healthcare team.

## Hackathon Project

This repository contains the complete Nexo+ platform developed for the hackathon, including:

- Backend API with FastAPI
- Frontend UI with React and TypeScript
- AI integration using LiteLLM
- WhatsApp integration for critical notifications
- Comprehensive documentation and presentation materials

## Repository Structure

```
nexo-plus-project/
├── backend/               # FastAPI backend
│   ├── app/               # Application code
│   │   ├── models.py      # Data models
│   │   ├── routes/        # API endpoints
│   │   └── services/      # Business logic
│   └── requirements.txt   # Python dependencies
├── frontend/              # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── types/         # TypeScript types
│   ├── package.json       # Node dependencies
│   └── tsconfig.json      # TypeScript configuration
└── docs/                  # Documentation
    ├── lean_canvas.md     # Business model canvas
    └── presentations/     # Presentation materials
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- [uv](https://github.com/astral-sh/uv) (recommended Python package/environment manager)

### Backend Setup

We recommend using `uv` for managing the Python environment and dependencies defined in `pyproject.toml`.

```bash
cd backend

# Create a virtual environment (recommended)
uv venv

# Activate the environment
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
uv pip sync pyproject.toml
```

Create a `.env` file in the backend directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
LLM_MODEL=gpt-3.5-turbo
WHATSAPP_PHONE_ID=your_whatsapp_phone_id
WHATSAPP_TOKEN=your_whatsapp_token
```

Start the backend server:
```bash
# Ensure your virtual environment is active
uv run uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Features

- **Patient Management**: Register and track patients
- **Measurement Recording**: Log vital signs and symptoms
- **Alert System**: AI-powered alerts based on clinical parameters
- **WhatsApp Notifications**: Critical alerts sent via WhatsApp
- **Clinical Guidelines**: Access to AHA and GES guidelines
- **AI Interpretation**: LiteLLM-powered interpretation of guidelines
- **Personalized Recommendations**: AI-generated adherence recommendations

## Hackathon Materials

- **Lean Canvas**: [docs/lean_canvas.md](docs/lean_canvas.md)
- **Pitch Presentation**: [docs/presentations/hackathon_pitch.md](docs/presentations/hackathon_pitch.md)
- **Pitch Script**: [docs/presentations/pitch_script.md](docs/presentations/pitch_script.md)
- **Demo Script**: [docs/presentations/demo_script.md](docs/presentations/demo_script.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- American Heart Association (AHA) for clinical guidelines
- Chilean GES program for local healthcare standards
