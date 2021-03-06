var expect = require('chai').expect;

var code = require('../../testCode/util/cookie');

var document = code.document;
var getCookie = code.getCookie;
var setCookie = code.setCookie;
var clearCookie = code.clearCookie;
var checkCookie = code.checkCookie;

describe('getCookie测试', function () {
    beforeEach(function () {
        //清空所有cookie
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    });

    it('未设置cookie时应返回空字符串', function () {
        var cookie = getCookie();
        expect(cookie).to.be.equal('');
    });

    it('设置了cookie但其中没有user时应返回空字符串', function () {
        document.cookie = "name=test";
        document.cookie = "time=now";
        var cookie = getCookie();
        expect(cookie).to.be.equal('');
    });

    it('设置了多个cookie且其中有user时应返回user内容', function () {
        document.cookie = "name=test";
        document.cookie = "time=now";
        document.cookie = "user=yzd";
        var cookie = getCookie();
        expect(cookie).to.be.equal('yzd');
    })

});

describe('setCookie测试', function () {
    before(function () {
        //清空所有cookie
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    });

    it("setCookie后cookie中user应正确设置", function () {
        setCookie('yzd');
        var user;
        var name = "user=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                user =  c.substring(name.length, c.length);
            }
        }
        expect(user).to.be.equal('yzd');
    })
});

describe('clearCookie测试', function () {
    before(function () {
        document.cookie = "user=yzd";
    });

    it('clearCookie后cookie中应不含user', function () {
        clearCookie();
        var user = null;
        var name = "user=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                user = c.substring(name.length, c.length);
            }
        }
        expect(user).to.be.null;
    })
});

describe('checkCookie测试', function () {
    before(function () {
        //清空所有cookie
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    });

    it('cookie中无user时log-status内应设置为登录', function () {
        checkCookie();
        expect(document.getElementById('log-status').innerText).to.be.equal('登录');
    });

    it('cookie中有user时log-status内应设置为user内容', function () {
        document.cookie = "user=yzd";
        checkCookie();
        expect(document.getElementById('log-status').innerText).to.be.equal('yzd');
    })

});

