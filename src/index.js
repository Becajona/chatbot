// Función para crear el chatbot dinámicamente con JavaScript
function createChatbotUI() {
    // Crear el título
    const title = document.createElement('h1');
    title.innerText = 'Chatbot con IA';

    // Crear el contenedor del chat
    const chatbox = document.createElement('div');
    chatbox.id = 'chatbox';
    chatbox.style.width = '100%';
    chatbox.style.height = '300px';
    chatbox.style.border = '1px solid #ccc';
    chatbox.style.padding = '10px';
    chatbox.style.overflowY = 'auto';

    // Crear el input para el mensaje del usuario
    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.id = 'userInput';
    userInput.placeholder = 'Escribe tu mensaje aquí...';
    userInput.style.width = '80%';
    userInput.style.padding = '10px';
    userInput.style.marginRight = '10px';

    // Crear el botón de enviar
    const sendBtn = document.createElement('button');
    sendBtn.id = 'sendBtn';
    sendBtn.innerText = 'Enviar';
    sendBtn.style.padding = '10px 20px';

    // Añadir los elementos al body
    document.body.appendChild(title);
    document.body.appendChild(chatbox);
    document.body.appendChild(userInput);
    document.body.appendChild(sendBtn);

    // Estilo del body
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.margin = '20px';

    // Cargar los scripts adicionales como Firebase y mandarMensaje.js
    loadExternalScripts();
}

// Función para cargar scripts externos (Firebase, mandarMensaje.js)
function loadExternalScripts() {
    // Cargar el script de mandarMensaje.js
    const script = document.createElement('script');
    script.src = 'mandarmensaje.js';
    document.body.appendChild(script);

    // Cargar los scripts de Firebase
    const firebaseApp = document.createElement('script');
    firebaseApp.src = 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
    document.body.appendChild(firebaseApp);

    const firebaseFirestore = document.createElement('script');
    firebaseFirestore.src = 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';
    document.body.appendChild(firebaseFirestore);
}

// Ejecutar la creación de la interfaz del chatbot
createChatbotUI();
