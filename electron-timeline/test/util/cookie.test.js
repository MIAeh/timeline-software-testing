var fs = require("fs");
var expect = require('chai').expect;
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

var html = fs.readFileSync('./index.html');
var window = (new JSDOM(html)).window;
var document = window.document;

window.mockData = {
    "user": {
        "username" : ""
    }
};


describe('getCookie测试', function () {
    beforeEach(function () {
        //清空cookie
        window.mockData.user["username"] = "";
    });

    it('未设置cookie时应返回空字符串', function () {
        var cookie = getCookie();
        expect(cookie).to.be.equal('');
    });

    it('设置了cookie时应返回设置内容', function () {
        window.mockData.user["username"] = 'yzd';
        var cookie = getCookie();
        expect(cookie).to.be.equal('yzd');
    });

});

describe('setCookie测试', function () {
    before(function () {
        //清空cookie
        window.mockData.user["username"] = "";
    });

    it("setCookie后cookie中username应正确设置", function () {
        setCookie('yzd');
        var user = window.mockData.user["username"];
        expect(user).to.be.equal('yzd');
    })
});

describe('clearCookie测试', function () {
    before(function () {
        window.mockData.user["username"] = 'yzd';
    });

    it('clearCookie后cookie中username应为空字符串', function () {
        clearCookie();
        var user = null;
        user = window.mockData.user["username"];
        expect(user).to.be.equal('');
    })
});

describe('checkCookie测试', function () {
    before(function () {
        //清空cookie
        window.mockData.user["username"] = "";
    });

    it('cookie中无user时log-status内应设置为登录', function () {
        window.mockData.user["username"] = '';
        checkCookie();
        expect(document.getElementById('log-status').innerText).to.be.equal('登录');
    });

    it('cookie中有user时log-status内应设置为user内容', function () {
        window.mockData.user["username"] = 'yzd';
        checkCookie();
        expect(document.getElementById('log-status').innerText).to.be.equal('yzd');
    })

});

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