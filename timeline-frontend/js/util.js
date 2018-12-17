var sDomain = "http://localhost:8080/";

function get(url, successCallback, dataType) {
    $.get({
        "url": url,
        "contentType": dataType,
        "success": function(oRes) {
            successCallback(oRes);
        }
    })
}

function post(url, successCallback, dataType) {
    $.post({
        "url": url,
        "contentType": dataType,
        "success": function (oRes) {
            successCallback(oRes);
        }
    })

}

function timeTrans(timestamp) {
    var time = new Date(timestamp);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var min = time.getMinutes();
    var second = time.getSeconds();
}