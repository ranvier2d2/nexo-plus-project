# Nexo+ Backend

This directory contains the FastAPI backend application for the Nexo+ platform.

## Structure

- `app/`: Contains the core application code.
  - `__init__.py`: Initializes the FastAPI application and includes routers.
  - `models.py`: Defines Pydantic data models for requests, responses, and internal data structures.
  - `routes/`: Contains API endpoint definitions (routers).
    - `patients.py`: Endpoints related to patient management.
    - `alerts.py`: Endpoints for generating and retrieving clinical alerts.
    - `system.py`: System health check endpoint.
  - `services/`: Contains business logic and integrations.
    - `ai_service.py`: Handles interaction with the LiteLLM service for AI features.
    - `clinical_parameters.py`: Defines clinical thresholds and parameters.
    - `whatsapp_service.py`: (Placeholder/Implicit) Handles sending notifications via WhatsApp.

## Service Structure

```
backend/
├── app/                # Core application source code
│   ├── __init__.py
│   ├── main.py         # FastAPI app instance
│   ├── models.py       # Pydantic models
│   ├── routes/         # API route definitions
│   │   ├── __init__.py
│   │   └── alerts.py
│   └── services/       # Business logic services
│       ├── __init__.py
│       ├── ai_service.py
│       └── clinical_parameters.py
├── tests/              # Pytest tests
│   ├── __init__.py
│   ├── conftest.py     # Test fixtures
│   └── routes/
│       ├── __init__.py
│       └── test_alerts.py
├── .env.example        # Example environment variables
├── .gitignore
├── pyproject.toml      # Project config and dependencies (uv)
└── README.md           # This file
```

#### Key Logic Locations

- **Alert Generation & Evaluation**: The core logic for evaluating patient measurements against clinical guidelines and generating alerts resides in `app/routes/alerts.py`, specifically within the `check_alerts` function.
- **AI Message Generation & Notifications**: The generation of AI-powered alert messages and the handling of external notifications (like WhatsApp) are managed by the `AIService` class in `app/services/ai_service.py`.

## Setup

It is recommended to use `uv` for environment and dependency management.

1.  **Navigate to the backend directory:**
    ```bash
    cd path/to/nexo-plus-project/backend
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    uv venv
    source .venv/bin/activate  # Linux/macOS
    # .venv\Scripts\activate  # Windows
    ```
3.  **Install dependencies:**
    ```bash
    uv pip sync pyproject.toml
    ```
4.  **Set up environment variables:**
    Copy `.env.example` to `.env` and fill in the required values (OpenAI API key, WhatsApp credentials, etc.).
    ```bash
    cp .env.example .env
    # Edit .env with your actual credentials
    ```

## Running the Server

Ensure your virtual environment is active.

```bash
uv run uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The API will be accessible at `http://localhost:8000` and the interactive documentation (Swagger UI) at `http://localhost:8000/docs`.

## Running Tests

Ensure your virtual environment is active.

```bash
uv run pytest
```

To run specific tests or with more verbosity:
```bash
uv run pytest tests/routes/test_alerts.py -v
```

- `tests/`: Contains automated tests for the backend.
  - `routes/`: Tests for specific API routes.
  - `conftest.py`: Pytest configuration and fixtures.
- `.env.example`: Example environment variable file.
- `pyproject.toml`: Project metadata and dependencies (managed by `uv`).
- `README.md`: This file.