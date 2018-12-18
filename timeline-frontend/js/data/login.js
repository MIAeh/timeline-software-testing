function getUser(successCallback) {
    var sUrl = sDomain + "/login";
    var sDataType = "application/json";
    get(sUrl, successCallback, sDataType);
}