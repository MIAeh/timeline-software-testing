function getUser(successCallback) {
    var sUrl = sDomain + "mockdata/users.json"
    get(sUrl, successCallback);
}