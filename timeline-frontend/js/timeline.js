$(document).ready(function() {
    $("#bt-load").click(function(){
        getTimeline(successCallback);

        function successCallback(res) {
            console.log(res);
        }
    });
})