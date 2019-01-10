var fs = require("fs");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

var html = fs.readFileSync('./index.html');
var window = (new JSDOM(html)).window;
var document = window.document;

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
};

function setCookie(cUser) {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    var expires = "expires="+d.toGMTString();
    document.cookie = "user=" + cUser + "; " + expires;
};

function clearCookie() {
    document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

function checkCookie() {
    if(getCookie() !== "") {
        document.getElementById('log-status').innerText = getCookie();
    } else {
        document.getElementById('log-status').innerText = "登录";
    }
};


var code = {
    getCookie: getCookie,
    setCookie: setCookie,
    clearCookie: clearCookie,
    checkCookie: checkCookie,
    window: window,
    document: document
};
module.exports = code;
