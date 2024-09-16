import requests
import json

API_KEY = 'AIzaSyAxj6XnMi3RAGmDvJvpJbc22IGZZo1DKIM'
URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

def generate_content(prompt):
    headers = {
        'Content-Type': 'application/json',
    }
    data = {
        'contents': [
            {
                'parts': [
                    {'text': prompt}
                ]
            }
        ]
    }
    response = requests.post(URL, headers=headers, params={'key': API_KEY}, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return {'error': 'Request failed with status code {}'.format(response.status_code)}

if __name__ == '__main__':
    prompt = "Explain how AI works"
    result = generate_content(prompt)
    print(json.dumps(result, indent=2))
