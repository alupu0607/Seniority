$(document).ready(function() {
    $(".btn--brand").on("click", function() {
      var categoryName = $(this).text();
      $("#categoryName p").text(categoryName);
      $("#chatbotContainer").show();
    });


    
    $(".btn--brand").on("click", function(event) {
        event.preventDefault();
        var chatbotOffset = $("#chatbotContainer").offset().top;
        $("html, body").animate({
            scrollTop: chatbotOffset
        }, 1000);
        var categoryName = $(this).text();
        $("#categoryName p").text(categoryName);
        $("#chatbotContainer").show();
        
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
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            var botHtml = '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="../../assets/images/Graident Ai Robot.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + data.message + '</div></div>';
            $("#messageFormeight").append($.parseHTML(botHtml));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
    

    $("#messageArea").on("submit", function(event) {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const str_time = hour+":"+minute;
      var rawText = $("#text").val();   
      var userHtml = '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' + rawText + '<span class="msg_time_send">'+ str_time + '</span></div><div class="img_cont_msg"><img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg"></div></div>';
      
      $("#text").val("");
      $("#messageFormeight").append(userHtml);    

        const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            msg: rawText
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
      event.preventDefault();
    });
  });