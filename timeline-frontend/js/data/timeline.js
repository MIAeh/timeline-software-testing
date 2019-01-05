function getTimeline(successCallback) {
    var sUrl = sDomain + "mockdata/timelines.json";
    var sDataType = "application/json";
    get(sUrl, successCallback, sDataType);
}