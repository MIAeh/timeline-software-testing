var fs = require("fs");
var expect = require('chai').expect;
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

var html = fs.readFileSync('./index.html');
var dom = new JSDOM(html);
var window = dom.window;
var document = window.document;

describe('timeTrans测试', function () {
    it('输入距现在一分钟内的时间戳应返回刚刚', function () {
        var time = new Date().getTime();
        var result = timeTrans(time);
        expect(result).to.be.equal('刚刚');
    });

    it('输入距现在30分钟到31分钟的时间戳应返回30分钟前', function () {
        var time = new Date().getTime() - 30*60*1000;
        var result = timeTrans(time);
        expect(result).to.be.equal('30分钟前');
    });

    it('输入距现在2小时到3小时的时间戳应返回2小时前', function () {
        var time = new Date().getTime() - 2*60*60*1000;
        var result = timeTrans(time);
        expect(result).to.be.equal('2小时前');
    });

    it('输入距现在2天到3天的时间戳应返回2天前', function () {
        var time = new Date().getTime() - 2*24*60*60*1000;
        var result = timeTrans(time);
        expect(result).to.be.equal('2天前');
    });

    it('输入距现在2周到3周的时间戳应返回2周前', function () {
        var time = new Date().getTime() - 2*7*24*60*60*1000;
        var result = timeTrans(time);
        expect(result).to.be.equal('2周前');
    });

    it('输入距现在2月到3月的时间戳应返回2月前', function () {
        var time = new Date().getTime() - 2*30*24*60*60*1000;
        var result = timeTrans(time);
        expect(result).to.be.equal('2月前');
    });

    it('输入距现在一年前的时间戳应返回时间戳表示的日期', function () {
        var time = new Date().getTime() - 13*30*7*24*60*60*1000;
        var result = timeTrans(time);
        var date = new Date(time);
        var expectResult = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
        expect(result).to.be.equal(expectResult);
    });
});

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
