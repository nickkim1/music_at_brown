import pytest 
from backend import api

######################################################################################################
# Really basic tests that test the main 'result' endpoints. 
# Aim of this file is to get a more comprehensive framework for testing later on, nothing final atm
######################################################################################################

@pytest.fixture
def client():
    api.testing = True
    client = api.test_client()
    return client

def test_artist_dashboard(): 
    """
    Test input into artist dash
    """
    response = client.post("http://127.0.0.1:5000/artistdashboard/", json={"username": "rich brian"})
    for k, v in response.json["profile"].items(): 
        if k == "username" or k == "name" or k == "description": 
            assert isinstance(v, str) # Check usernames are strs

def test_user_dashboard(): 
    """
    Test input into user dash
    """
    response = client.post("http://127.0.0.1:5000/userdashboard/", json={"username": "poor brian"})
    for k, v in response.json["profile"].items(): 
        if k == "username" or k == "name" or k == "description": 
            assert isinstance(v, str) # Check usernames are strs

def test_recommendations(): 
    """
    Test regular and malformed queries for recs
    """
    response = client.post("http://127.0.0.1:5000/recommendations/", json={"username": ["marshmello", "drake"], "genre": [["disco", "pop"], ["pop", "rap"]]})
    assert response["status"]=="Success"
    response = client.post("http://127.0.0.1:5000/recommendations/", json={"username": ["drake"], "genre": [["disco", "pop"], ["pop", "rap"]]})
    assert response["status"]=="Error"
