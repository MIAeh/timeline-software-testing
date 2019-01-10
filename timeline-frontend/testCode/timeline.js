var fs = require("fs");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

var html = fs.readFileSync('./index.html');
var dom = new JSDOM(html);
var window = dom.window;
var document = window.document;
var $ = require("jquery")(window);


function refresh() {
    $.ajax({
        "url": "http://www.ecnu-joyin.top:3000/messages",
        "type": "GET",
        "async": false,
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


function createTimelineItem(user, con, pic, time) {
    var li = document.createElement('li');
    var getPic = (pic !== "") ? '<img src=' + pic + ' class="msg-pic">' : '';
    li.innerHTML = '<div class="timeline-listItem"><div class="msg"><p class="msg-title">' +
        '<span class="msg-user">' + user + '</span>' +
        '<span class="msg-time">' + timeTrans(time) + '</span></p>' +
        '<p class="msg-content">' + con + '</p>' + getPic + '</div></div>';
    return li;
}


function timeTrans(timestamp) {
    var second = 1000;
    var min = second * 60;
    var hour = min * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 30;
    var year = month * 12;

    var now = new Date().getTime();
    // console.log(now.toString());
    var diff = now - timestamp;

    var diffMin = diff / min;
    var diffHour = diff / hour;
    var diffDay = diff / day;
    var diffWeek = diff / week;
    var diffMonth = diff / month;
    var diffYear = diff / year;

    var result = "";
    /* istanbul ignore next  */
    if(diffYear >= 1) {
        var date = new Date(timestamp);
        result = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
        /* istanbul ignore next  */
    } else if(diffMonth >= 1 && diffMonth < 12) {
        result = parseInt(diffMonth) + "月前";
    } else if(diffWeek >= 1 && diffWeek <= 4) {
        result = parseInt(diffWeek) + "周前";
    } else if(diffDay >= 1 && diffDay < 7) {
        result = parseInt(diffDay) + "天前";
    } else if(diffHour >= 1 && diffHour < 24) {
        result = parseInt(diffHour) + "小时前";
    } else if(diffMin >= 1 && diffMin < 60) {
        result = parseInt(diffMin) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}

var code = {
    refresh: refresh,
    showMore: showMore,
    window: window,
    document: document,
    $: $
};
module.exports = code;