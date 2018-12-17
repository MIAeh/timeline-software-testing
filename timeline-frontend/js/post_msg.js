var content = document.getElementById('edit-area');
var list = document.getElementById('timelines');
$(document).ready(function() {
    $('#bt-add').click(function () {
        if(document.getElementById('edit-part').classList.contains('hide')) {
            document.getElementById('edit-part').classList.remove('hide');
        } else {
            document.getElementById('edit-part').classList.add('hide');
        }
    })

    $("#bt-post-new-msg").click(function() {
        if(content.value) {
            var li = document.createElement('li');
            li.innerHTML = '<div class="msg"><p class="msg-title"><span class="msg-user">aaa</span>' +
                '<span class="msg-time">2013-1-2</span></p>' +
                '<p class="msg-content">ksakdka</p></div>';
            list.insertBefore(li, list.children[0]);
        } else {
            alert('请输入内容再发送哦~');
        }

    })
});