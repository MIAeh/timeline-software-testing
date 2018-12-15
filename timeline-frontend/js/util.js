/**
 * Created by Ed_Strickland on 2018/12/15.
 */
var sDomain = "http://localhost:8080/";

function get(url, successCallback) {
    $.get({
        "url": url,
        "contentType": "application/json",
        "success": function(oRes) {
            successCallback(oRes);
        }
    })
}

function post() {

}