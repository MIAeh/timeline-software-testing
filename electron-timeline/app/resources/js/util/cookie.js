function getCookie() {
    $.getJSON('electron-timeline/app/resources/js/data/user.json', function (data) {
        var check = data["username"];
        console.log(check);
        return check;
    })
}

function setCookie(cUser) {
    $.getJSON('electron-timeline/app/resources/js/data/user.json', function (data) {
        data["username"] = cUser;
    })
}

function clearCookie() {
    $.getJSON('electron-timeline/app/resources/js/data/user.json', function (data) {
        data["username"] = "";
    })
}


function checkCookie() {
    if(getCookie() !== "") {
        document.getElementById('log-status').innerText = getCookie();
    } else {
        document.getElementById('log-status').innerText = "登录";
    }
}