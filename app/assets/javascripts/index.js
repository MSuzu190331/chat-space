$(document).on('turbolinks:load',function() {

  var search_list = $("#user-search-result");    //親要素のdivクラス
// 検索して引っかかったユーザー名(子要素のdivクラス)を親要素の下に追加するための処理
  function appendUser_name(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

//検索して引っかからなかったときの子要素のdivクラス
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }

//チャットメンバーに追加するためのやつ
  var chat_member = $("#chat-group-users");
  function appendChatmember(name,id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    chat_member.append(html);
  }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      console.log(users)
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser_name(user);

        });
      }
      else {
        appendErrMsgToHTML("該当するユーザーがおりません");
      }
    })
    .fail(function() {
      alert('ユーザー情報取得に失敗しました');
    })
  });



//クリックしたらチャットメンバーに追加するため
  $("#user-search-result").on("click", ".chat-group-user__btn--add", function () {
    $('.chat-group-user__btn--add').parent().remove()
      var name= $(this).data('user-name')
      var id = $(this).data('user-id')
      appendChatmember(name,id)
  });

  $(".chat-group-form__field--right").on("click", ".chat-group-user__btn--remove", function () {
    $(this).parent().remove()

  });


});