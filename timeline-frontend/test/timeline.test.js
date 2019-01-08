var fs = require("fs");
var expect = require('chai').expect;
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

var html = fs.readFileSync('./index.html');
var options = {
    beforeParse(window) {
        window.alert = function () {
            return true;
        };
        window.confirm = function () {
            return true;
        };
    }
};
var dom = new JSDOM(html, options);
var window = dom.window;
var document = window.document;
var $ = require("jquery")(window);

describe('refresh测试', function () {

    it('li元素数量应大于6，第6条li应未被隐藏，第7条li应被隐藏，bt-load应未被隐藏', function () {
        refresh();

        var list = $("#timelines");
        var count = ($("li").length);
        expect(count).to.be.above(6);
        expect(list.children("li:eq(5)").hasClass("hide")).to.be.equal(false);
        expect(list.children("li:eq(6)").hasClass("hide")).to.be.equal(true);
        expect(document.getElementById('bt-load').classList.contains('hide')).to.be.equal(false);
    });

});

describe('showMore测试', function () {
    it('第7个子元素隐藏时应将所有子元素取消隐藏且bt-load显示收起', function () {
        var list = document.getElementById('timelines').childNodes;
        var len = list.length;
        list.item(6).classList.add('hide');
        showMore();

        expect($("#timelines").children("li").hasClass('hide')).to.be.equal(false);
        expect($('#bt-load').text()).to.be.equal("收起");
    });

    it('第7个子元素未隐藏时应将第7个及之后的子元素隐藏且bt-load显示更多...', function () {
        var list = document.getElementById('timelines').childNodes;
        var len = list.length;
        list.item(6).classList.remove('hide');
        showMore();

        expect($("#timelines").children("li:eq(6)").hasClass('hide')).to.be.equal(true);
        expect($("#timelines").children("li:last-child").hasClass('hide')).to.be.equal(true)
        expect($('#bt-load').text()).to.be.equal("更多...");
    });
});


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
    if(diffYear >= 1) {
        var date = new Date(timestamp);
        result = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
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

function getCookie() {
    var name = "user=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cUser) {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    var expires = "expires="+d.toGMTString();
    document.cookie = "user=" + cUser + "; " + expires;
}

function clearCookie() {
    document.cookie = "user";
}

function checkCookie() {
    if(getCookie() !== "") {
        document.getElementById('log-status').innerText = getCookie();
    } else {
        document.getElementById('log-status').innerText = "登录";
    }
}
