function postUser(sData) {
    var sUrl = sDomain + '/register';
    var sDataType = "application/json";
    post(sUrl, sData, sDataType);
}