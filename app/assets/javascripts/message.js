$(document).on('turbolinks:load',function() {
  
  function buildmessage(message){
    var content = message.content? `${message.content}`:"" 
    var image = message.image.url? `${message.image.url}`:""
    var html = `<div class="message" data-id="${message.id}">
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
        $('#message_image').val('');
        $('.messages').animate({scrollTop: $('.messages').get(0).scrollHeight },'fast');
      })
      .fail(function(){
        alert('メッセージを入力してください');
      })
      .always(function(){
        $(".new-message__submit-btn").removeAttr('disabled')
      });
    });


// ここから先自動更新
    $(function(){
      var url = location.href
      // console.log(url)
      if (url.match(/message/)){
      var reloadMessages = function() {
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.message:last').data('id');
        var group_id = $(`.chat-main`).data(`group-id`);
        // console.log(last_message_id); 
        // console.log(group_id);
        $.ajax({
          //ルーティングで設定した通りのURLを指定
          url: `/groups/${group_id}/api/messages`,
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'get',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {id: last_message_id}
        })
        .done(function(messages) {
          // console.log(messages)
          $.each(messages, function(index, message){
            console.log(message)
            var html = buildmessage(message);
            $('.messages').append(html);
            $('.messages').animate({scrollTop: $('.messages').get(0).scrollHeight },'fast');
          });
          // buildmessage(message)
        })
        .fail(function() {
          console.log('自動更新が停止しました');
        });
      };
      //途中省略
      //$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
        setInterval(reloadMessages, 5000);
    }
  });
});