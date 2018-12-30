function Log(){
    if(document.getElementById('log-status').innerText === "登录") {
        document.getElementById('shade').classList.remove('hide');
        document.getElementById('login').classList.remove('hide');
    } else {
        if(window.confirm("确定要注销吗？")) {
            document.cookie = "user=";
            document.getElementById('log-status').innerText = "登录";
            window.location.href = "";
        }
    }
}

function ShowLogin(){
    document.getElementById('login-pwd').value = "";
    document.getElementById('login-username').value = "";
    document.getElementById('shade').classList.remove('hide');
    document.getElementById('login').classList.remove('hide');
    document.getElementById('register').classList.add('hide');
}

function ShowRegister(){
    document.getElementById('register-pwd').value = "";
    document.getElementById('register-username').value = "";
    document.getElementById('register-confirm-pwd').value = "";
    document.getElementById('shade').classList.remove('hide');
    document.getElementById('register').classList.remove('hide');
    document.getElementById('login').classList.add('hide');
}

function HideAll(){
    document.getElementById('shade').classList.add('hide');
    document.getElementById('login').classList.add('hide');
    document.getElementById('register').classList.add('hide');
}


/**
 * 验证input是否为空
 * @param username login/register中用户名输入
 * @param pwd login/register中密码输入
 * @param confirm_pwd register中的确认密码
 */
/**
 * 用户名
 * @return {boolean}
 */
function onBlur_username() {
    if(document.getElementById('register').classList.contains('hide')) {
        var username = document.getElementById('login-username').value;
        if(!username) {
            document.getElementById('login-username-reminder').innerHTML = "请输入用户名";
            return false;
        } else {
            document.getElementById('login-username-reminder').innerHTML = "";
            return true;
        }
    } else {
        var username = document.getElementById('register-username').value;
        if(!username) {
            document.getElementById('register-username-reminder').innerHTML = "请输入用户名";
            return false;
        } else {
            document.getElementById('register-username-reminder').innerHTML = "";
            return true;
        }
    }
}
function onFocus_username() {
    document.getElementById('login-username-reminder').innerHTML = "";
    document.getElementById('register-username-reminder').innerHTML = "";
}

/**
 * 密码
 * @returns {boolean}
 */
function onBlur_pwd() {
    if(document.getElementById('register').classList.contains('hide')) {
        var pwd = document.getElementById('login-pwd').value;
        if (!pwd) {
            document.getElementById('login-pwd-reminder').innerHTML = "请输入密码";
            return false;
        } else {
            document.getElementById('login-pwd-reminder').innerHTML = "";
            return true;
        }
    } else {
        var pwd = document.getElementById('register-pwd').value;
        if(!pwd) {
            document.getElementById('register-pwd-reminder').innerHTML = "请输入密码";
        } else {
            document.getElementById('register-pwd-reminder').innerHTML = "";
        }
    }
}
function onFocus_pwd() {
    document.getElementById('login-pwd-reminder').innerHTML = "";
    document.getElementById('register-pwd-reminder').innerHTML = "";
}

/**
 * 确认密码
 * @returns {boolean}
 */
function onBlur_confirm_pwd() {
    var confirm_pwd = document.getElementById('register-confirm-pwd').value;
    var pwd = document.getElementById('register-pwd').value;
    if(!confirm_pwd) {
        document.getElementById('confirm-pwd-reminder').innerHTML = "请再输入一遍密码！";
        return false;
    } else if(confirm_pwd != pwd) {
        document.getElementById('confirm-pwd-reminder').innerHTML = "两次输入密码不一致";
        return false;
    }else {
        document.getElementById('confirm-pwd-reminder').innerHTML = "";
        return true;
    }
}

function onFocus_confirm_pwd() {
    document.getElementById('confirm-pwd-reminder').innerHTML = "";
}

/**
 * 登录submit
 * @constructor
 */
function Login() {
    var user = document.getElementById('login-username').value;
    var pwd = document.getElementById('login-pwd').value;
    // getUser(successCallback);
    //
    // function successCallback(res) {
    //
    // }

    $.ajax({
        "url": 'http://www.ecnu-joyin.top:3000/login',
        "data": {"username": user},
        "type": "GET",
        "dataType": "json",
        success: function(oRes) {
            if(typeof (oRes.res) === "undefined" || oRes.res.length === 0) {
                alert("用户不存在！");
                console.log("----no such user----");
            } else {
                var cmp = oRes.res["0"].password;
                // console.log(cmp);
                if(pwd === cmp) {
                    //设置cookie
                    setCookie(user);
                    // console.log(getCookie());
                    document.getElementById('log-status').innerText = getCookie();
                    HideAll();
                    console.log("----login success----");
                } else {
                    alert("密码输入错误！");
                    console.log("----wrong password----");
                }
            }
        }
    })
}

function Register() {
    var user = document.getElementById('register-username').value;
    // console.log(user);
    var pwd = document.getElementById('register-pwd').value;
    var confirmpwd = document.getElementById('register-confirm-pwd').value;
    if(!user) {
        alert("用户名不能为空！");
    } else if(user.length > 30) {
        alert("用户名不能大于12个字符！");
    } else if(!pwd) {
        alert("密码不能为空！");
    } else if(!confirmpwd) {
        alert("请确认密码");
    } else if(pwd != confirmpwd) {
        alert("两次密码不一致");
    } else if(pwd.length > 15) {
        alert("密码长度不能大于15");
    } else {
        // var data = {"username": user, "password": pwd};
        // postUser(data);
        $.ajax({
            "url": 'http://www.ecnu-joyin.top:3000/register',
            "data": {"username": user, "password": pwd},
            "type": "POST",
            "dataType": "json",
            success: function(oRes) {
                if(oRes) {
                    if(oRes.code == "001") {
                        alert("该用户名已经存在");
                    } else if(oRes.code == "000") {
                        alert("注册成功！");
                        ShowLogin();
                    }
                }
                console.log("----register success----");
            }
        })
    }

}