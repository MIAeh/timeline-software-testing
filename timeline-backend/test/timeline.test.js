var expect = require('chai').expect;
var request = require('supertest');
var app = require('../bin/timeline');

describe('注册接口测试', function () {
    it('数据库中插入成功后应返回code000', function (done) {
        var registerInfo = {
            password : 123
        };
        registerInfo.username = new Date().getTime();
        request(app)
            .post('/register')
            .send(registerInfo)
            .end(function (err, res) {
                if(err) return done(err);
                expect(res.body.code).to.equal('000');
                done();
            });
    });

    it('数据库中插入失败后应返回code001', function (done) {
        var registerInfo = {
            password : 123
        };
        registerInfo.username = new Date().getTime();
        request(app)
            .post('/register')
            .send(registerInfo)
            .then(function () {
                request(app)
                    .post('/register')
                    .send(registerInfo)
                    .end(function (err, res) {
                        if(err) return done(err);
                        expect(res.body.code).to.equal('001');
                        done();
                    });
            })

    });
});

describe('登录接口测试', function () {
    it('账户存在时返回code000且res为一个包含密码的数组', function (done) {
        var registerInfo = {
            password : 123
        };
        var username = new Date().getTime();
        registerInfo.username = username;
        request(app)
            .post('/register')
            .send(registerInfo)
            .then(function () {
                request(app)
                    .get('/login?username='+username)
                    .end(function (err, res) {
                        if(err) return done(err);
                        expect(res.body.code).to.equal('000');
                        expect(res.body.res).to.have.length(1);
                        expect(res.body.res[0].password).to.equal('123');
                        done();
                    });
            })
    });
    it('账户不存在时返回code000且res为一个空数组', function (done) {
        request(app)
            .get('/login?username='+new Date().getTime())
            .end(function (err, res) {
                if(err) return done(err);
                expect(res.body.code).to.equal('000');
                expect(res.body.res).to.have.length(0);
                done();
            });
    });
});

describe('发布接口测试', function () {
    it('无参数picture时应正常处理并返回code000', function (done) {
        request(app)
            .post('/publish')
            .field('username', new Date().getTime())
            .field('content', '无参数picture时应正常处理并返回000')
            .end(function (err, res) {
                if(err) return done(err);
                expect(res.body.code).to.equal('000');
                done();
            })
    });
    it('带文件picture时应正常处理并返回code000', function (done) {
        request(app)
            .post('/publish')
            .field('username', new Date().getTime())
            .field('content', '带文件picture时应正常处理并返回000')
            .attach('picture', 'C:\\Users\\hasee\\Pictures\\Uplay\\Tom Clancy\'s Rainbow Six® Siege\\Tom Clancy\'s Rainbow Six® Siege2017-9-15-21-8-56.jpg')
            .end(function (err, res) {
                if(err) return done(err);
                expect(res.body.code).to.equal('000');
                done();
            })
    })
});

describe('获取消息接口测试', function () {
    it('应返回code000及大小大于0的数组res', function (done) {
        request(app)
            .get('/messages')
            .end(function (err, res) {
                if(err) return done(err);
                expect(res.body.code).to.equal('000');
                expect(res.body.res.length).to.be.above(0);
                done();
            })
    })

});