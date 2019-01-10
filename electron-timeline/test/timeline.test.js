var expect = require('chai').expect;
var code = require('../testCode/timeline');

var showMore = code.showMore;
var refresh = code.refresh;
var window = code.window;
var document = code.document;
var $ = code.$;

describe('refresh测试', function () {

    it('li元素数量应大于6，第6条li应未被隐藏，第7条li应被隐藏，bt-load应未被隐藏', function () {
        refresh();

        var list = $("#timelines");
        var count = ($("li").length);
        expect(count).to.be.above(6);
        expect(list.children("li:eq(5)").hasClass("hide")).to.be.equal(false);
        expect(list.children("li:eq(6)").hasClass("hide")).to.be.equal(true);
        expect(document.getElementById('bt-load').classList.contains('hide')).to.be.equal(false);
    });

});

describe('showMore测试', function () {
    it('第7个子元素隐藏时应将所有子元素取消隐藏且bt-load显示收起', function () {
        var list = document.getElementById('timelines').childNodes;
        var len = list.length;
        list.item(6).classList.add('hide');
        showMore();

        expect($("#timelines").children("li").hasClass('hide')).to.be.equal(false);
        expect($('#bt-load').text()).to.be.equal("收起");
    });

    it('第7个子元素未隐藏时应将第7个及之后的子元素隐藏且bt-load显示更多...', function () {
        var list = document.getElementById('timelines').childNodes;
        var len = list.length;
        list.item(6).classList.remove('hide');
        showMore();

        expect($("#timelines").children("li:eq(6)").hasClass('hide')).to.be.equal(true);
        expect($("#timelines").children("li:last-child").hasClass('hide')).to.be.equal(true)
        expect($('#bt-load').text()).to.be.equal("更多...");
    });
});

