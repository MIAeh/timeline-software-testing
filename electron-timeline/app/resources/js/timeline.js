/**
 * get新消息方法要写在ready里，防止刷新页面取消数据
 */
var page = 2;
var flag = 1;
$(document).ready(function() {
    refresh();
});

function refresh() {
    $.ajax({
        "url": "http://www.ecnu-joyin.top:3000/messages",
        "type": "GET",
        "success": function (oRes) {
            // var list = document.getElementById('timelines');
            // list.childNodes().remove();
            var list = $("#timelines")
            list.children().remove();
            var resLen = oRes.res.length;
            for (var i = resLen - 1; i >= 0; i--) {
                var user = oRes.res[i].username.toString();
                var con = oRes.res[i].content.toString();
                var pic = encodeURI(oRes.res[i].picture.toString());
                var timestamp = oRes.res[i].time;
                var new_li = createTimelineItem(user, con, pic, timestamp);
                var count = ($("li").length);
                if(count > 10) {
                    new_li.classList.add('hide');
                }
                list.append(new_li);
            }
        }
    })
}
/**
 * 新增消息button
 */
$('#bt-add').click(function () {
    if(getCookie() !== "") {
        if(document.getElementById('edit-part').classList.contains('hide')) {
            document.getElementById('edit-part').classList.remove('hide');
        } else {
            document.getElementById('edit-part').classList.add('hide');
        }
    } else {
        alert("请先登录！");
        ShowLogin();
    }
});

/**
 * 发布新消息button
 */
$("#bt-post-new-msg").click(function() {
    var content = document.getElementById('edit-area');
    var user = getCookie();
    var fileDom = document.getElementById('bt-upload-img');
    var formData = new FormData();
    formData.append("username", user);
    formData.append("content", content.value);
    if(fileDom.value === "") {
        formData.append("picture", "");
    } else {
        var pic = fileDom.files[0];
        formData.append("picture", pic);
    }
    if(content.value) {
        $.ajax ({
            "url": "http://www.ecnu-joyin.top:3000/publish",
            "data": formData,
            "dataType": "json",
            "type": "POST",
            "contentType": false,
            "processData": false,
            "success": function(oRes) {
                alert("发布成功~");
                refresh();
            }
        });

        //清空消息输入栏
        content.value = "";
        document.getElementById('bt-upload-img').value = "";
    } else {
        alert('请输入内容再发送~');
    }
});

/**
 * 取消发布button
 */
$("#bt-cancel-post").click(function () {
    document.getElementById('edit-part').classList.add('hide');
});

/**
 * 刷新button
 */
$("#bt-refresh").click(function () {
    refresh();
});

function showMore() {
    var list = document.getElementById('timelines').childNodes;
    var len = list.length;
    if(list.item(12).classList.contains('hide')) {
        for(var a = 12; a < len; a++) {
            if(list.item(a).classList.contains('hide')) {
                list.item(a).classList.remove('hide');
            }
        }
    } else {
        for(var a = 12; a < len; a++) {
            list.item(a).classList.add('hide');
        }

    }
}

$(document).scroll(function(){
    var viewH = $(this).height(),
        contentH = window.innerHeight,
        scrollTop = $(this).scrollTop();

    if (viewH - contentH - scrollTop <= 100 && flag) {
        flag = 0;
        showMore();
        page ++;
    }
});