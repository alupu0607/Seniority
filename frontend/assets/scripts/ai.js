$(document).ready(function() {
  let speechEnabled = false;
  let speechUtterance;
  let clientPostCount = 0;
  let isParagraphBlurred = false;

  function blurParagraph() {
      if (!isParagraphBlurred) {
          $(".paragraph-to-blur").addClass("blurred");
          isParagraphBlurred = true;
      }
  }


  function speak(text) {
      if (speechEnabled) {
          const speechSynthesis = window.speechSynthesis;
          speechUtterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(speechUtterance);
      }
  }
  function scrollToBottom() {
    $("#messageFormeight").scrollTop($("#messageFormeight")[0].scrollHeight);
  }
  
  $(document).on("click", ".enableSpeechButton", function(event) {
      event.preventDefault();
      const messageText = $(this).data('message');
      if (speechEnabled) {
          const speechSynthesis = window.speechSynthesis;
          speechSynthesis.cancel();
          speechEnabled = false;
      } else {
          speechEnabled = true;
          speak(messageText);
      }
  });

  $(".btn--brand").on("click", function(event) {
      event.preventDefault();
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const str_time = hour + ":" + (minute < 10 ? '0' + minute : minute);
      var categoryName = $(this).text();
      $("#categoryName p").text(categoryName);
      $("#chatbotContainer").show();

      var chatbotOffset = $("#chatbotContainer").offset().top;
      $("html, body").animate({ scrollTop: chatbotOffset }, 1000);

      fetch('http://localhost:8000/send-message?msg=' + encodeURIComponent(categoryName), {
          method: 'GET',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          isParagraphBlurred = false;
          document.getElementById("text").disabled = false;
          return response.json();
      })
      .then(data => {
          console.log('Server response:', data);


          const message = data.message;
          const parts = message.split('[...]');

          const paragraphText = parts.length > 1 ? '[...]' + parts[1] + '[...]' : parts[0];
          const question = parts.length > 2 ? parts[2].trim() : '';

          const botHtmlParagraph = `
              <div class="d-flex justify-content-start mb-4">
                  <div class="img_cont_msg">
                      <img src="../../assets/images/Graident Ai Robot.jpg" class="rounded-circle user_img_msg">
                  </div>
                  <div class="msg_cotainer paragraph-to-blur">
                      <span style="background-color: #f0f0f0;">
                          Try to memorize as much as possible from the following paragraph. After you carefully do so, you can start answering the questions, but the paragraph will disappear.
                      </span>
                      <br><br>${paragraphText}
                      <button class="enableSpeechButton btn btn-sm btn-primary" data-message="Try to memorize as much as possible from the following paragraph. After you carefully do so, you can start answering the questions, but the paragraph will disappear.[][][]${paragraphText}" style="background-color: transparent; border: none;">
                          <i class="fas fa-volume-up" style="opacity: 0.5; color: black"></i>
                      </button>
                      <span class="msg_time">${str_time}</span>
                  </div>
                  
              </div>`;
          
          $("#messageFormeight").append($.parseHTML(botHtmlParagraph));
          
          const botHtmlQuestion = `
              <div class="d-flex justify-content-start mb-4">
                  <div class="img_cont_msg">
                      <img src="../../assets/images/Graident Ai Robot.jpg" class="rounded-circle user_img_msg">
                  </div>
                  <div class="msg_cotainer">${question}
                      <button class="enableSpeechButton btn btn-sm btn-primary" data-message="${question}"  style="background-color: transparent; border: none;">
                          <i class="fas fa-volume-up" style="opacity: 0.5; color: black "></i>
                      </button>
                      <span class="msg_time">${str_time}</span>
                  </div>
                
              </div>`;
          $("#messageFormeight").append($.parseHTML(botHtmlQuestion));
          scrollToBottom();
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });

  $("#messageArea").on("submit", function(event) {
      event.preventDefault();
      
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const str_time = hour + ":" + (minute < 10 ? '0' + minute : minute);
      
      var rawText = $("#text").val();
      var userHtml = `
          <div class="d-flex justify-content-end mb-4">
              <div class="msg_cotainer_send">${rawText}<span class="msg_time_send">${str_time}</span></div>
              <div class="img_cont_msg">
                  <img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg">
              </div>
          </div>`;
      
      $("#text").val("");
      $("#messageFormeight").append(userHtml);

      clientPostCount++;
      console.log(clientPostCount);
        

      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ msg: rawText })
      };
      
      if (clientPostCount % 3 ==0){
        const botHtml = `
        <div class="d-flex justify-content-start mb-4">
            <div class="img_cont_msg">
                <img src="../../assets/images/Graident Ai Robot.jpg" class="rounded-circle user_img_msg">
            </div>
            <div class="msg_cotainer">
                Analyzing your responses! <br> This might take a few moments...
                <button class="enableSpeechButton btn btn-sm btn-primary" data-message="Analyzing your responses... this might take a few moments..." style="background-color: transparent; border: none;">
                  <i class="fas fa-volume-up" style="opacity: 0.5; color: black;"></i>
                </button>
              <span class="msg_time">${str_time}</span>
            </div>
        </div>`;
      $("#messageFormeight").append($.parseHTML(botHtml));
      document.getElementById("text").disabled = true;
      

      scrollToBottom();  
      }
      fetch('http://localhost:8000/send-message', requestOptions)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Message sent successfully:', data);
          text = data.message;
          
            const botHtml = `
              <div class="d-flex justify-content-start mb-4">
                  <div class="img_cont_msg">
                      <img src="../../assets/images/Graident Ai Robot.jpg" class="rounded-circle user_img_msg">
                  </div>
                  <div class="msg_cotainer">
                      ${data.message}
                      <button class="enableSpeechButton btn btn-sm btn-primary" data-message="${data.message}" style="background-color: transparent; border: none;">
                        <i class="fas fa-volume-up" style="opacity: 0.5; color: black;"></i>
                      </button>
                    <span class="msg_time">${str_time}</span>
                  </div>
              </div>`;
          $("#messageFormeight").append($.parseHTML(botHtml));
          scrollToBottom();
          blurParagraph();
      })
      .catch(error => {
          console.error('Error sending message:', error);
      });
  });

  $(window).on('beforeunload', function() {
      speechEnabled = false;
  });

  $(window).on('unload', function() {
      const speechSynthesis = window.speechSynthesis;
      speechSynthesis.cancel();
  });
});
