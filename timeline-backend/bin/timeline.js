var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//允许跨域请求
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');//自定义中间件，设置跨域需要的响应头。
    next();
};

app.use(allowCrossDomain);

//路由
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//注册
app.post('/register', function(req, res){
    //连接数据库
    var $mysql = require("mysql");
    var sql = require("./mysql");
    var $sql = $mysql.createConnection(sql.mysql);
    $sql.connect();

    var username = req.body.username;
    var password = req.body.password;

    var register = "insert into account (username, password) value (\"" + username + "\",\"" + password + "\")";

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
    $sql.end();
});

//登陆
app.get('/login', function(req, res){
    //连接数据库
    var $mysql = require("mysql");
    var sql = require("./mysql");
    var $sql = $mysql.createConnection(sql.mysql);
    $sql.connect();

    var username = req.query.username;

    var login = "select password from account where username = \"" + username + "\"";

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
    $sql.end();
});

var formidableMiddleware = require('express-formidable');
app.use(formidableMiddleware());
var fs = require("fs");
//发布消息
app.post('/publish', function(req, res) {
    //连接数据库
    var $mysql = require("mysql");
    var sql = require("./mysql");
    var $sql = $mysql.createConnection(sql.mysql);
    $sql.connect();

    var username = req.fields.username;
    var content = req.fields.content;

    var picture = req.files.picture;
    var pictureName;
    if(typeof(picture)=="undefined") {
        pictureName = '';
        var publish = "insert into message (username, content, picture, time) value (\"" + username + "\",\"" + content +  "\",\"" + pictureName + "\",\"" + new Date().getTime() + "\")";

        var outRes = res;
        $sql.query(publish, function(err,res){
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
        $sql.end();
    } else {
        pictureName = new Date().getTime().toString() + '-' + picture.name;
        var des_file = "/opt/lampp/htdocs/timeline/" + pictureName;
        pictureName = "http://47.100.239.92/timeline/" + pictureName;
        fs.readFile( picture.path, function (err, data) {
            if(err) {
                var response = {
                    code : '001',
                    err : err
                };
                res.json(response);
                $sql.end();
            } else {
                fs.writeFile(des_file, data, function (err) {
                    if( err ){
                        var response = {
                            code : '001',
                            err : err
                        };
                        res.json(response);
                        $sql.end();
                    } else {
                        var publish = "insert into message (username, content, picture, time) value (\"" + username + "\",\"" + content +  "\",\"" + pictureName + "\",\"" + new Date().getTime() + "\")";

                        var outRes = res;
                        $sql.query(publish, function(err,res){
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
                        $sql.end();
                    }
                });
            }

        });
    }



});

//获取消息
app.get('/messages', function(req, res) {
    //连接数据库
    var $mysql = require("mysql");
    var sql = require("./mysql");
    var $sql = $mysql.createConnection(sql.mysql);
    $sql.connect();

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
    $sql.end();
});
module.exports = app;
