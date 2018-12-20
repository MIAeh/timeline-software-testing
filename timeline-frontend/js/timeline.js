/**
 * get新消息方法要写在ready里，防止刷新页面取消数据
 */
$(document).ready(function() {
    $.ajax({
        "url": "http://www.ecnu-joyin.top:3000/messages",
        "type": "GET",
        "success": function (oRes) {
            console.log(oRes);
            // console.log('timestamp' + oRes.res[12].time);
            // console.log(oRes.res[11].picture);
            var list = document.getElementById('timelines');
            var resLen = oRes.res.length;
            for (var i = resLen - 1; i >= 0; i--) {
                var user = oRes.res[i].username.toString();
                var con = oRes.res[i].content.toString();
                var pic = oRes.res[i].picture.toString();
                var timestamp = oRes.res[i].time;
                var new_li = createTimelineItem(user, con, pic, timestamp);
                var count = ($("li").length);
                console.log('count' + count);
                if(count > 4) {
                    new_li.classList.add('hide');
                }
                list.append(new_li);
            }
        }
    });
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
            console.log(fileDom.value);
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
                    window.location.href = "";
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
        window.location.href = "";
    });

    $("#bt-load").click(function(){
        var list = document.getElementById('timelines').childNodes;
        var len = list.length;
        console.log(len);
        console.log(list.item(len - 6).classList.contains('hide'));
        if(list.item(6).classList.contains('hide')) {
            for(var a = 6; a < len; a++) {
                if(list.item(a).classList.contains('hide')) {
                    list.item(a).classList.remove('hide');
                }
            }
            $("#bt-load").innerText = "收起";
        } else {
            for(var a = 6; a < len; a++) {
                list.item(a).classList.add('hide');
            }
            $("#bt-load").innerText = "更多...";
        }
    });
});