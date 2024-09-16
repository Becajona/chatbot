

from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

# Crear la instancia de la aplicación Flask
app = Flask(__name__)

# Configurar CORS
CORS(app)
API_KEY = 'AIzaSyAxj6XnMi3RAGmDvJvpJbc22IGZZo1DKIM'
URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    headers = {
        'Content-Type': 'application/json',
    }
    data = {
        'contents': [
            {
                'parts': [
                    {'text': user_message}
                ]
            }
        ]
    }
    response = requests.post(URL, headers=headers, params={'key': API_KEY}, json=data)

    if response.status_code == 200:
        api_response = response.json()
        message_text = api_response.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', 'No response')
        return jsonify({'response': message_text})
    else:
        return jsonify({'error': 'Failed to get response from API'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
