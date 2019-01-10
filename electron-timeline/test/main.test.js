var Application = require('spectron').Application;
var assert = require('assert');
var expect = require('chai').expect;

describe('应用启动测试', function () {
    this.timeout(10000);//程序启动的延时

    beforeEach(function () {
        this.app = new Application({
            path: './Timeline-win32-x64/Timeline.exe'
        });
        return this.app.start()
    });

    afterEach(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }
    });

    it('应打开一个窗口', function () {
        return this.app.client.getWindowCount().then(function (count) {
            expect(count).to.be.equal(1);
        })
    })
});