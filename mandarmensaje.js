


document.getElementById('sendBtn').addEventListener('click', function() {
    const userMessage = document.getElementById('userInput').value;
    if (userMessage.trim() !== "") {
        // Mostrar el mensaje del usuario en el chatbox
        const chatbox = document.getElementById('chatbox');
        chatbox.innerHTML += `<p><strong>Tú:</strong> ${userMessage}</p>`;

        // Limpiar el campo de entrada
        document.getElementById('userInput').value = '';

        // Enviar el mensaje al servidor
        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        })
        .then(response => response.json())
        .then(data => {
            // Mostrar la respuesta del chatbot
            chatbox.innerHTML += `<p><strong>Chatbot:</strong> ${data.response}</p>`;
            chatbox.scrollTop = chatbox.scrollHeight;  // Desplazar hacia abajo
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});