var content = document.getElementById('edit-area');
var list = document.getElementById('timelines');
$(document).ready(function() {
    $('#bt-add').click(function () {
        if(document.getElementById('edit-part').classList.contains('hide')) {
            document.getElementById('edit-part').classList.remove('hide');
        } else {
            document.getElementById('edit-part').classList.add('hide');
        }
    });

    $("#bt-post-new-msg").click(function() {
        if(content.value) {
            var li = document.createElement('li');
            li.innerHTML = '<li class="timeline-listItem"><div class="msg"><p class="msg-title"><span class="msg-user">aaa</span>' +
                '<span class="msg-time">刚刚</span></p>' +
                '<p class="msg-content">' + content.value + '</p></div></li>';
            list.insertBefore(li, list.children[0]);
            //清空消息输入栏
            content.value = "";
        } else {
            alert('请输入内容再发送~');
        }
    });

    $("#bt-cancel-post").click(function () {
        document.getElementById('edit-part').classList.add('hide');
    });

    $("#bt-load").click(function(){
        getTimeline(successCallback);

        function successCallback(res) {
            console.log(res);
        }
    });

})
