function getCookie() {
    // $.getJSON('../data/user.js', function (data) {
    //     var check = data["username"];
    //     console.log(window.href);
    //     console.log(check);
    //     return check;
    // })
    var check = window.mockData.user["username"];
        console.log(window.href);
        console.log(check);
        return check;
}

function setCookie(cUser) {
    window.mockData.user["username"] = cUser;
}

function clearCookie() {
    window.mockData.user["username"] = "";
}


function checkCookie() {
    if(getCookie() !== "") {
        document.getElementById('log-status').innerText = getCookie();
    } else {
        document.getElementById('log-status').innerText = "登录";
    }
}