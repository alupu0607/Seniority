const microphoneButton = document.getElementById('microphone');


let recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

microphoneButton.addEventListener('click', () => {
    recognition.start();
    microphoneButton.classList.add('active');
});

recognition.onresult = function(event) {
    let recognizedText = event.results[0][0].transcript;
    renderRecognizedText(recognizedText);
    sendTextToServer(recognizedText);
};

recognition.onspeechend = function() {
    recognition.stop();
    microphoneButton.classList.remove('active');
};

function renderRecognizedText(rawText) {
    const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const str_time = hour+":"+minute;
      var userHtml = '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' + rawText + '<span class="msg_time_send">'+ str_time + '</span></div><div class="img_cont_msg"><img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg"></div></div>';
      $("#text").val("");
      $("#messageFormeight").append(userHtml); 
}

function sendTextToServer(text) {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const str_time = hour + ":" + minute;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            msg: text
        })
    };

    fetch('http://localhost:8000/send-message', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Message sent successfully:', data);
            const botHtml = `
            <div class="d-flex justify-content-start mb-4">
              <div class="img_cont_msg">
                <img src="../../assets/images/Graident Ai Robot.jpg" class="rounded-circle user_img_msg">
              </div>
              <div class="msg_cotainer">${data.message}<span class="msg_time">${str_time}</span></div>
            </div>`;
          $("#messageFormeight").append(botHtml);
          })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}
