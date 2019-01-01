$(document).ready(function() {

    $('#submitWeather').click(function() {
        var city = $("#city").val();

        if (city!='') {
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" 
                + "&APPID=3b2a6440c9db33c97812d5b7f73e9206",
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    document.getElementById("city").style.display = "none";
                    document.getElementById("submitWeather").style.display = "none";

                    var widget= show(data);
                    $("#showWeather").html(widget);
                }
            });
        } else {
            alert("도시이름을 입력해주세요!");
        }
    });
});

function show(data) {
    return "현재날씨: " + data.weather[0].main + "<br />" + 
    "날씨설명: " + data.weather[0].description + "<br />" +
    "현재온도: " + Math.round(data.main.temp) + " ºC" + "<br />" + 
    "위치: " + data.name + ", " + data.sys.country;
}