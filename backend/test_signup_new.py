import requests

url = "http://localhost:8000/api/auth/signup"
data = {
    "email": "test@example.com",
    "username": "testuser",
    "password": "SecurePass123",
    "first_name": "Test",
    "last_name": "User",
    "company": "Test Co",
    "industry": "Software"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
