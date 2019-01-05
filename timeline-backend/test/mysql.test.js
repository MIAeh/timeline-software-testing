var expect = require('chai').expect;
var connectionInfo = require('../bin/mysql').mysql;

describe('数据库连接测试', function () {
   it('数据库配置应该不为空', function () {
       expect(connectionInfo).to.not.be.null;
   })
});
