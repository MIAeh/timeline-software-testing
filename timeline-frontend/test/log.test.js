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

describe('onBlur_username测试', function () {
   it('元素register隐藏且login-username未输入时应返回false且login-username-reminder应设为请输入用户名', function () {
       document.getElementById('register').classList.add('hide');

       var result = onBlur_username();
       expect(result).to.be.equal(false);
       expect(document.getElementById('login-username-reminder').innerHTML).to.be.equal("请输入用户名");
   });

    it('元素register隐藏且login-username已输入时应返回true且login-username-reminder应设为空字符串', function () {
        document.getElementById('register').classList.add('hide');
        document.getElementById('login-username').value = 'yzd';

        var result = onBlur_username();
        expect(result).to.be.equal(true);
        expect(document.getElementById('login-username-reminder').innerHTML).to.be.equal("");
    });

    it('元素register未隐藏且register-username未输入时应返回false且register-username-reminder应设为请输入用户名', function () {
        document.getElementById('register').classList.remove('hide');

        var result = onBlur_username();
        expect(result).to.be.equal(false);
        expect(document.getElementById('register-username-reminder').innerHTML).to.be.equal("请输入用户名");
    });

    it('元素register未隐藏且register-username已输入时应返回true且register-username-reminder应设为空字符串', function () {
        document.getElementById('register').classList.remove('hide');
        document.getElementById('register-username').value = 'yzd';

        var result = onBlur_username();
        expect(result).to.be.equal(true);
        expect(document.getElementById('register-username-reminder').innerHTML).to.be.equal("");
    });
});

describe('onBlur_pwd测试', function () {
    it('元素register隐藏且login-pwd未输入时应返回false且login-pwd-reminder应设为请输入密码', function () {
        document.getElementById('register').classList.add('hide');

        var result = onBlur_pwd();
        expect(result).to.be.equal(false);
        expect(document.getElementById('login-pwd-reminder').innerHTML).to.be.equal("请输入密码");
    });

    it('元素register隐藏且login-pwd已输入时应返回true且login-pwd-reminder应设为空字符串', function () {
        document.getElementById('register').classList.add('hide');
        document.getElementById('login-pwd').value = 'yzd';

        var result = onBlur_pwd();
        expect(result).to.be.equal(true);
        expect(document.getElementById('login-pwd-reminder').innerHTML).to.be.equal("");
    });

    it('元素register未隐藏且register-pwd未输入时应返回false且register-pwd-reminder应设为请输入密码', function () {
        document.getElementById('register').classList.remove('hide');

        var result = onBlur_pwd();
        expect(result).to.be.equal(false);
        expect(document.getElementById('register-pwd-reminder').innerHTML).to.be.equal("请输入密码");
    });

    it('元素register未隐藏且register-pwd已输入时应返回true且register-pwd-reminder应设为空字符串', function () {
        document.getElementById('register').classList.remove('hide');
        document.getElementById('register-pwd').value = 'yzd';

        var result = onBlur_pwd();
        expect(result).to.be.equal(true);
        expect(document.getElementById('register-pwd-reminder').innerHTML).to.be.equal("");
    });
});

describe('onBlur_confirm_pwd测试', function () {

    it('register-confirm-pwd未输入时应返回false且confirm-pwd-reminder应设为请再输入一遍密码！', function () {
        var result = onBlur_confirm_pwd();
        expect(result).to.be.equal(false);
        expect(document.getElementById('confirm-pwd-reminder').innerHTML).to.be.equal("请再输入一遍密码！");
    });

    it('register-confirm-pwd已输入但与register-pwd不同时应返回false且confirm-pwd-reminder应设为两次输入密码不一致', function () {
        document.getElementById('register-pwd').value = 'yzd';
        document.getElementById('register-confirm-pwd').value = 'yzd2';

        var result = onBlur_confirm_pwd();
        expect(result).to.be.equal(false);
        expect(document.getElementById('confirm-pwd-reminder').innerHTML).to.be.equal("两次输入密码不一致");
    });

    it('register-confirm-pwd已输入且与register-pwd相同时应返回true且confirm-pwd-reminder应设为空字符串', function () {
        document.getElementById('register-pwd').value = 'yzd';
        document.getElementById('register-confirm-pwd').value = 'yzd';

        var result = onBlur_confirm_pwd();
        expect(result).to.be.equal(true);
        expect(document.getElementById('confirm-pwd-reminder').innerHTML).to.be.equal("");
    });
});


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
