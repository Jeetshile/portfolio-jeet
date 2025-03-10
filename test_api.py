import requests
import json

BASE_URL = 'http://localhost:5000/api'

def test_contact():
    print("\nTesting contact endpoint...")
    data = {
        "name": "Test User",
        "email": "jeetshile.email@gmail.com",
        "message": "This is a test message"
    }
    response = requests.post(f'{BASE_URL}/contact', json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")

def test_projects():
    print("\nTesting projects endpoint...")
    response = requests.get(f'{BASE_URL}/projects')
    print(f"Status: {response.status_code}")
    print("Projects received:")
    for project in response.json():
        print(f"- {project['title']}")

def test_skills():
    print("\nTesting skills endpoint...")
    response = requests.get(f'{BASE_URL}/skills')
    print(f"Status: {response.status_code}")
    skills = response.json()
    for category, skill_list in skills.items():
        print(f"\n{category.upper()}:")
        for skill in skill_list:
            print(f"- {skill['name']}: {skill['level']}%")

if __name__ == '__main__':
    print("Starting API tests...")
    test_projects()
    test_skills()
    # Uncomment to test contact form (requires valid email configuration)
    test_contact() 