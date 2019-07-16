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
                    <p class="lower-message__image">
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
//サイドバーの非同期
        var last_message_content = data.content;
        var current_group_id = $(`.chat-main`).data(`group-id`);
        var target_html = $('#group-' + current_group_id).find('.group__latest-message')
        target_html.text(last_message_content);

      })
      .fail(function(){
        alert('メッセージを入力してください');
      })
      .always(function(){
        $(".new-message__submit-btn").removeAttr('disabled')
      });
    });


//change使う方サイドバー非同期、自動更新のやりかた(とりあえず保留)
// $(document).ready(function(data) {
//   $('.messages').on('DOMSubtreeModified propertychange', function() {
//     var last_message = $('.message:last')
//   console.log(last_message)
  //   });
  // });



// ここから先自動更新
        .done(function(messages) {
  $(function(){
    
    
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.message:last').data('id');
      var group_id = $('.chat-main').data('group-id');

      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: `/groups/${group_id}/api/messages`,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id, group_id: group_id}
      })
      .done(function(messages) {
        $.each(messages, function(index, message){
          var html = buildmessage(message);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages').get(0).scrollHeight },'fast');
        });

          var elements = document.getElementsByClassName('message__text');
          var lastElement = elements[elements.length - 1].innerText;
          var current_group_id = $(`.chat-main`).data(`group-id`);
          var target_html = $('#group-' + current_group_id).find('.group__latest-message')
          target_html.text(lastElement);
    
        })
      .fail(function() {
        alert('自動更新が停止しました');
      });
    };
    var url = location.pathname

      if ($(".current-group")[0]){
        setInterval(reloadMessages, 5000);
      }

  });
});