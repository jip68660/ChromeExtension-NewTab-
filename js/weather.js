var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function getWeather() {
    var openWeatherMap = "http://api.openweathermap.org/data/2.5/weather";
    $.getJSON(openWeatherMap, {
        lat: localStorage.lat,
        lon: localStorage.long,
        units: "metric",
        APPID: "3b2a6440c9db33c97812d5b7f73e9206"
    }).done(function(data) {
        displayWeatherInfo(data);
    }).fail(function() {
        localStorage.setItem("currLocAllwed", false);
    });
}

function storageCheckLocation() {

    if (localStorage.currLocAllowed == "true") {
        if (!localStorage.lat || !localStorage.long) {
            window.navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        } else {
            getWeather();
        }
    } else {
        bootbox.alert("현재위치정보 사용을 허용해주세요");
    }
}

function refreshLocation() {
    window.navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    localStorage.setItem("a", "changed");
}

function onSuccess(pos) {
    var crd = pos.coords;
    localStorage.setItem("lat", crd.latitude);
    localStorage.setItem("long", crd.longitude);
    getWeather();
}

function onError(err) {
    bootbox.alert("현재 위치를 가져올수 없습니다.</br> 날씨정보를 이용하려면 현재위치 사용을 허용해주세요");
}

function displayWeatherInfo(data) {

    console.log(data);
    
    $("#weatherInfoArea").show();
    $(".weatherIconImg").hide();
    $("#currTemp").html(Math.round(data.main.temp));
    $("#tempMinMaxArea").html(data.main.temp_min + " ºC / " + data.main.temp_max + " ºC");
    // $("#tempMin").html("최저: " + data.main.temp_min + " ºC");
    // $("#tempMax").html("최대: " + data.main.temp_max + " ºC");

    var desc = data.weather[0].description;

    var weatherDesc;
    if (desc == "clear sky") {
        weatherDesc = "맑음";
        //check time
        $("#weatherSun").show();
    } else if (desc == "few clouds" || desc == "scattered clouds" || desc == "broken clouds" || desc == "overcast clouds" || data.weather[0].main == "Clouds") {
        weatherDesc = "흐림";
        //check time
        $("#weatherClouds").show();
    } else if (desc == "shower rain" || desc == "moderate rain") {
        weatherDesc = "이슬비";
        $("#weatherShower").show();
    } else if (desc == "rain" || data.weather[0].main == "Rain") {
        weatherDesc = "비";
        $("#weatherRain").show();
    } else if (desc == "thunderstorm") {
        weatherDesc = "폭풍";
        $("#weatherStorm").show();
    } else if (desc == "snow") {
        weatherDesc = "눈";
        $("#weatherSnow").show();
    } else if (desc == "mist" || desc == "haze" || desc == "fog") {
        weatherDesc = "안개";
        $("#weatherMist").show();
    }
    $("#weatherDesc").html(weatherDesc);
}

/**
 * weather types
 * 
 * 1) clear sky (day, night)
 * 2) few clouds (day, night)
 * 3) scattered clouds
 * 4) broken clouds
 * 5) shower rain
 * 6) rain
 * 7) thunderstorm
 * 8) snow
 * 9) mist
 * 10) fog
 * 11) haze
 * 
 */