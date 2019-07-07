$(function() {
  function buildmessage(message){
    var content = message.content? `${message.content}`:"" 
    var image = message.image? `${message.image}`:""
    var html = `<div class="message">
                  <div class="upper-info">
                    <div class="upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class="upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                    <p class="message__text">
                      ${content}
                    </p>
                    <p class="message__text">
                      <img src=${image}>
                    </p>
                </div>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
      })
      .done(function(data){
        var html = buildmessage(data);
        $('.messages').append(html);
        $('.input-box__text').val('');
        $('.messages').animate({scrollTop: $('.messages').get(0).scrollHeight },'fast');
      })
      .fail(function(){
        alert('メッセージを入力してください');
      })
      .always(function(){
        $(".new-message__submit-btn").removeAttr('disabled')
      });
    });
});