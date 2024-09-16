const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  try {
    // Llamada a la API de Google Gemini
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: userMessage
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `AIzaSyAxj6XnMi3RAGmDvJvpJbc22IGZZo1DKIM` // Reemplaza con tu API Key
        }
      }
    );

    // Obtén la respuesta generada
    const generatedResponse = response.data.contents[0].parts[0].text;

    // Envía la respuesta al usuario
    res.json({ response: generatedResponse });
  } catch (error) {
    console.error('Error contacting the API:', error);
    res.status(500).json({ error: 'Error contacting the API' });
  }
});

app.listen(port, () => {
  console.log(`Chatbot server listening at http://localhost:${port}`);
});
