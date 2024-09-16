const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware para parsear JSON y configurar CORS
app.use(express.json());
app.use(cors());


const  API_KEY = 'AIzaSyAxj6XnMi3RAGmDvJvpJbc22IGZZo1DKIM'; // Reemplaza por tu API key
const URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Ruta para el chatbot
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message || '';

    if (!userMessage) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        const response = await axios.post(URL, {
            contents: [
                {
                    parts: [
                        { text: userMessage }
                    ]
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                key: API_KEY
            }
        });

        const messageText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
        res.json({ response: messageText });

    } catch (error) {
        res.status(500).json({ error: 'Failed to get response from API' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
