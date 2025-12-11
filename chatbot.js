// Chatbot functionality - Script réutilisable
(function() {
  // Attendre que le DOM soit chargé
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

  function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotContainer = document.getElementById('chatbotContainer');

    if (!chatbotToggle || !chatbotWindow) return;

    // Ouvrir/Fermer le chat
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
      chatbotContainer.classList.toggle('active');
    });

    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
        chatbotContainer.classList.remove('active');
      });
    }

    // Réponses automatiques
    const responses = {
      'bonjour': 'Bonjour ! Comment puis-je vous aider ?',
      'salut': 'Salut ! Que puis-je faire pour vous ?',
      'service': 'Nous proposons : Design Graphique, Sites Web, Photographie, Communication Digitale et Stratégie de Marque. Lequel vous intéresse ?',
      'tarif': 'Nos tarifs varient selon le projet. Contactez-nous à contact@creativelight.com ou au +221 77 873 09 56 pour un devis personnalisé.',
      'prix': 'Nos tarifs varient selon le projet. Contactez-nous à contact@creativelight.com ou au +221 77 873 09 56 pour un devis personnalisé.',
      'contact': 'Vous pouvez nous contacter par email : contact@creativelight.com ou par téléphone : +221 77 873 09 56. Nous sommes basés à Dakar, Sénégal.',
      'adresse': 'Nous sommes situés à Dakar, Sénégal.',
      'merci': 'De rien ! N\'hésitez pas si vous avez d\'autres questions.',
      'au revoir': 'Au revoir ! À bientôt !',
      'design': 'Nous créons des logos, identités visuelles et designs modernes. Voulez-vous en savoir plus ?',
      'site web': 'Nous concevons des sites web modernes et responsives. Souhaitez-vous un devis ?',
      'photo': 'Nous proposons des services de photographie et montage vidéo professionnels.',
    };

    function getBotResponse(userMessage) {
      const lowerMessage = userMessage.toLowerCase();
      for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
          return response;
        }
      }
      return 'Merci pour votre message ! Pour plus d\'informations, contactez-nous à contact@creativelight.com ou visitez notre page Contact.';
    }

    function addMessage(text, isBot = false) {
      if (!chatbotMessages) return;
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
      const contentDiv = document.createElement('div');
      contentDiv.className = 'message-content';
      contentDiv.innerHTML = `<p>${text}</p>`;
      messageDiv.appendChild(contentDiv);
      chatbotMessages.appendChild(messageDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function sendMessage() {
      if (!chatbotInput) return;
      const message = chatbotInput.value.trim();
      if (message) {
        addMessage(message, false);
        chatbotInput.value = '';
        setTimeout(() => {
          const botResponse = getBotResponse(message);
          addMessage(botResponse, true);
        }, 1000);
      }
    }

    if (chatbotSend) {
      chatbotSend.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }
  }
})();


