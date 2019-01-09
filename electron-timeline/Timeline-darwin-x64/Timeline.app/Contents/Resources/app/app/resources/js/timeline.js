/**
 * get新消息方法要写在ready里，防止刷新页面取消数据
 */
$(document).ready(function() {
    checkCookie();
    listenTextarea();
    refresh();
});

function refresh() {
    $.ajax({
        "url": "http://www.ecnu-joyin.top:3000/messages",
        "type": "GET",
        "success": function (oRes) {
            // var list = document.getElementById('timelines');
            // list.childNodes().remove();
            var list = $("#timelines");
            list.children().remove();
            var resLen = oRes.res.length;
            for (var i = resLen - 1; i >= 0; i--) {
                var user = oRes.res[i].username.toString();
                var con = oRes.res[i].content.toString();
                var pic = encodeURI(oRes.res[i].picture.toString());
                var timestamp = oRes.res[i].time;
                var new_li = createTimelineItem(user, con, pic, timestamp);
                var count = ($("li").length);
                // console.log(count);
                if(count > 5) {
                    new_li.classList.add('hide');
                    document.getElementById('bt-load').classList.remove('hide');
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
 * 监听textarea字数：不超过120字
 */
function textCount(element) {
    var value = element.value;
    var len = value.length;
    return len;
}

function listenTextarea() {
    document.getElementById('edit-area').addEventListener('input', function () {
        var newValue = document.getElementById('edit-area').value.substring(0, 120);
        $('#edit-area').val(newValue);
        document.getElementById('c-left').innerText = textCount(this);
    })
}

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
        if(fileDom.files[0].size > 1024 * 1024 * 4) {
            alert("图片大小不能超过4MB!");
            document.getElementById('bt-upload-img').value = "";
            return;
        }
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
            "success": function() {
                alert("发布成功~");
                refresh();
            }
        });

        //清空消息输入栏
        content.value = "";
        document.getElementById('bt-upload-img').value = "";
        document.getElementById('c-left').innerText = "0";
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
    $('#bt-load').text("更多...");
});


$("#bt-load").click(function () {
    showMore();
});

function showMore() {
    var list = document.getElementById('timelines').childNodes;
    var len = list.length;
    if(list.item(6).classList.contains('hide')) {
        for(var a = 6; a < len; a++) {
            if(list.item(a).classList.contains('hide')) {
                list.item(a).classList.remove('hide');
            }
        }
        $('#bt-load').text("收起");
    } else {
        for(var a = 6; a < len; a++) {
            list.item(a).classList.add('hide');
        }
        $('#bt-load').text("更多...");
    }
}



// $(document).scroll(function(){
//     var viewH = $(this).height(),
//         contentH = window.innerHeight,
//         scrollTop = $(this).scrollTop();
//
//     if (viewH - contentH - scrollTop <= 100 && flag) {
//         flag = 0;
//         showMore();
//         page ++;
//     }
// });