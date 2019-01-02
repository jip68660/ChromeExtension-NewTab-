$(document).ready(storageCheckWeather);

function storageCheckWeather() {
    console.log('running');

    if (localStorage.getItem('cityvalue') == null) {
        document.getElementById("weatherIn").style.display = "inline";
        document.getElementById("submitWeather").addEventListener("click", onWeatherEnter);
    } else {
        displayWeather();
    }
}

function onWeatherEnter() {
    var city = $("#cityInput").val();

        if (city!='') {
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" 
                + "&APPID=3b2a6440c9db33c97812d5b7f73e9206",
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    document.getElementById("weatherIn").style.display = "none";

                    var widget= show(data);                    
                    localStorage.setItem('cityvalue', widget);
                    displayWeather();
                }
            });
        } else {
            alert("도시이름을 입력해주세요!");
        }
}

function show(data) {
    return data.weather[0].main + "<br />" + 
    Math.round(data.main.temp) + " ºC" + "<br />" + 
    data.name + ", " + data.sys.country;
}

function displayWeather() {
    $("#showWeather").html(localStorage.getItem('cityvalue'));
    document.getElementById("weatherIn").style.display = "none";
    document.getElementById("showWeather").style.display = "inline";
}