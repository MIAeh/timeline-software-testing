var fs = require("fs");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

var html = fs.readFileSync('./index.html');
var dom = new JSDOM(html);
var window = dom.window;
var document = window.document;

/**
 * 验证input是否为空
 * @param username login/register中用户名输入
 * @param pwd login/register中密码输入
 * @param confirm_pwd register中的确认密码
 */
/**
 * 用户名
 * @return {boolean}
 */
function onBlur_username() {
    if(document.getElementById('register').classList.contains('hide')) {
        var username = document.getElementById('login-username').value;
        if(!username) {
            document.getElementById('login-username-reminder').innerHTML = "请输入用户名";
            return false;
        } else {
            document.getElementById('login-username-reminder').innerHTML = "";
            return true;
        }
    } else {
        var username = document.getElementById('register-username').value;
        if(!username) {
            document.getElementById('register-username-reminder').innerHTML = "请输入用户名";
            return false;
        } else {
            document.getElementById('register-username-reminder').innerHTML = "";
            return true;
        }
    }
}

/**
 * 密码
 * @returns {boolean}
 */
function onBlur_pwd() {
    if(document.getElementById('register').classList.contains('hide')) {
        var pwd = document.getElementById('login-pwd').value;
        if (!pwd) {
            document.getElementById('login-pwd-reminder').innerHTML = "请输入密码";
            return false;
        } else {
            document.getElementById('login-pwd-reminder').innerHTML = "";
            return true;
        }
    } else {
        var pwd = document.getElementById('register-pwd').value;
        if(!pwd) {
            document.getElementById('register-pwd-reminder').innerHTML = "请输入密码";
            return false;
        } else {
            document.getElementById('register-pwd-reminder').innerHTML = "";
            return true;
        }
    }
}

/**
 * 确认密码
 * @returns {boolean}
 */
function onBlur_confirm_pwd() {
    var confirm_pwd = document.getElementById('register-confirm-pwd').value;
    var pwd = document.getElementById('register-pwd').value;
    if(!confirm_pwd) {
        document.getElementById('confirm-pwd-reminder').innerHTML = "请再输入一遍密码！";
        return false;
    } else if(confirm_pwd != pwd) {
        document.getElementById('confirm-pwd-reminder').innerHTML = "两次输入密码不一致";
        return false;
    }else {
        document.getElementById('confirm-pwd-reminder').innerHTML = "";
        return true;
    }
}

var code = {
    onBlur_confirm_pwd: onBlur_confirm_pwd,
    onBlur_username: onBlur_username,
    onBlur_pwd: onBlur_pwd,
    window: window,
    document: document
};
module.exports = code;
