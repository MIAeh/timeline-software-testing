function getTimeline(successCallback) {
    var sUrl = sDomain + "mockdata/timelines.json"
    get(sUrl, successCallback);
}