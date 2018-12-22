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
    console.log(now.toString());
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
    } else if(diffMonth >= 1 && diffMonth <= 11) {
        result = parseInt(diffMonth) + "月前";
    } else if(diffWeek >= 1 && diffWeek <= 3) {
        result = parseInt(diffWeek) + "周前";
    } else if(diffDay >= 1 && diffDay <= 6) {
        result = parseInt(diffDay) + "天前";
    } else if(diffHour >= 1 && diffHour <= 23) {
        result = parseInt(diffHour) + "小时前";
    } else if(diffMin >= 1 && diffMin <= 59) {
        result = parseInt(diffMin) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}