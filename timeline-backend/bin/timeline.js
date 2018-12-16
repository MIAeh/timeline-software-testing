var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//连接数据库
var $mysql = require("mysql");
var sql = require("./mysql");

var $sql = $mysql.createConnection(sql.mysql);

$sql.connect();

//路由
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//注册
app.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    var register = "insert into account (username, password) value (" + username + "," + password + ")";

    var outRes = res;
    $sql.query(register, function(err,res){
        if(err){
            var response = {
                code : "001",
                err : err
            };
            outRes.json(response);
        }else{
            var response = {
                code : "000",
                res : res
            };
            outRes.json(response);
        }
    });

});

//登陆
app.get('/login', function(req, res){
    var username = req.query.username;

    var login = "select password from account where username = " + username;

    var outRes = res;
    $sql.query(login, function(err,res){
        if(err){
            var response = {
                code : "001",
                err : err
            };
            outRes.json(response);
        }else{
            var response = {
                code : "000",
                res : res
            };
            outRes.json(response);
        }
    });
});

//发布消息
app.post('/publish', function(req, res) {
    var username = req.body.username;
    var content = req.body.content;

    var register = "insert into message (username, content) value (" + username + "," + content + ")";

    var outRes = res;
    $sql.query(register, function(err,res){
        if(err){
            var response = {
                code : "001",
                err : err
            };
            outRes.json(response);
        }else{
            var response = {
                code : "000",
                res : res
            };
            outRes.json(response);
        }
    });
});

//获取消息
app.get('/messages', function(req, res) {
    var messages = "select * from message";

    var outRes = res;
    $sql.query(messages, function(err,res){
        if(err){
            var response = {
                code : "001",
                err : err
            };
            outRes.json(response);
        }else{
            var response = {
                code : "000",
                res : res
            };
            outRes.json(response);
        }
    });
});

app.listen(3000);