var userCookie = "";

function getCookie() {
    return userCookie;
}

function setCookie(cUser) {
    userCookie = cUser;
}

function clearCookie() {
    userCookie = "";
}

function checkCookie() {
    if(getCookie() !== "") {
        document.getElementById('log-status').innerText = userCookie;
    } else {
        document.getElementById('log-status').innerText = "登录";
    }
}