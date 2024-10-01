const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Importa el módulo path


const app = express();

// Middleware para parsear JSON y configurar CORS
app.use(express.json());
app.use(cors());



// Sirve archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, '../public')));


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
        console.error('Error from API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get response from API' });
    }
    
});
const PORT = process.env.PORT || 3300;  // Usa el puerto asignado por Railway o 3000 como fallback

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
