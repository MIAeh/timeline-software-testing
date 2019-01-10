var expect = require('chai').expect;
var code = require('../../testCode/util/timeline-item');

var document = code.document;
var timeTrans = code.timeTrans;

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