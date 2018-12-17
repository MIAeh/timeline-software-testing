function ShowLogin(){
    document.getElementById('shade').classList.remove('hide');
    document.getElementById('login').classList.remove('hide');
    document.getElementById('register').classList.add('hide');
}
function ShowRegister(){
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
 * 登录表格submit
 * @constructor
 */
function Login() {
    var username = document.getElementById('login-username').value;
    var pwd = document.getElementById('login-pwd').value;
    getUser(successCallback);

    function successCallback(res) {
        console.log(res);
    }
}

function Register() {
    var username = document.getElementById('register-username').value;
    var pwd = document.getElementById('register-pwd').value;
    var confirmpwd = document.getElementById('register-confirm-pwd').value;
    if(!username) {
        alert("用户名不能为空！");
        return false;
    } else if(!pwd) {
        alert("密码不能为空！");
        return false;
    } else if(!confirmpwd) {
        alert("请确认密码");
        return false;
    } else {
        getUser(successCallback);
        function successCallback() {

        }
    }

}