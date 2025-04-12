import pytest
from fastapi.testclient import TestClient

# Adjust the import path according to your project structure
# Assuming your main FastAPI app instance is named 'app' in 'app/__init__.py'
from app import app as fastapi_app 

@pytest.fixture(scope="module")
def client():
    """Yield a TestClient instance for the FastAPI application."""
    with TestClient(fastapi_app) as test_client:
        yield test_client
