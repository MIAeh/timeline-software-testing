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

function post(url, successCallback, errorCallback, dataType) {
    $.post({
        "url": url,
        "contentType": dataType,
        "success": function () {
            successCallback();
        },
        "error": function () {
            errorCallback();
        }
    })
}