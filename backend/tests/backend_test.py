"""Backend API tests for Mindful Yoga app"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://yoga-flow-35.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Root ---
def test_root(api_client):
    r = api_client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert r.json().get("message") == "Mindful Yoga API"


# --- Classes ---
def test_classes_list(api_client):
    r = api_client.get(f"{BASE_URL}/api/classes")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 4
    required = {"id", "name", "price", "schedule", "duration", "description", "image"}
    for c in data:
        assert required.issubset(c.keys()), f"Missing fields: {required - c.keys()}"


# --- Payment create-order (demo mode) ---
def test_create_order_demo(api_client):
    payload = {
        "class_id": "vinyasa-flow",
        "class_name": "Vinyasa Flow",
        "amount": 899,
        "customer_name": "TEST_User",
        "customer_email": "test_user@example.com",
        "customer_phone": "9999999999",
    }
    r = api_client.post(f"{BASE_URL}/api/payment/create-order", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["order_id"].startswith("order_demo_")
    assert data["currency"] == "INR"
    assert data["amount"] == 89900  # paise
    assert data["booking_id"]
    assert data["razorpay_key_id"]
    # Persistence check via bookings list
    b = api_client.get(f"{BASE_URL}/api/bookings")
    assert b.status_code == 200
    ids = [x.get("id") for x in b.json()]
    assert data["booking_id"] in ids


# --- Contact ---
def test_contact_valid(api_client):
    payload = {"name": "TEST_Contact", "email": "contact_test@example.com", "message": "hello there"}
    r = api_client.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["status"] == "received"
    assert "id" in data
    assert data["email_sent"] is False  # placeholder


def test_contact_invalid_email(api_client):
    payload = {"name": "x", "email": "not-an-email", "message": "hi"}
    r = api_client.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 422


# --- Bookings ---
def test_bookings_list(api_client):
    r = api_client.get(f"{BASE_URL}/api/bookings")
    assert r.status_code == 200
    assert isinstance(r.json(), list)
