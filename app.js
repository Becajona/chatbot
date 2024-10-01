require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y configurar CORS
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

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
                key: process.env.API_KEY
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
