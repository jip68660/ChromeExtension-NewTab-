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
        alert("íì¬ìì¹ì ë³´ ì¬ì©ì íì©í´ì£¼ì¸ì");
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
    alert("íì¬ ìì¹ë¥¼ ê°ì ¸ì¬ì ììµëë¤.");
}

function displayWeatherInfo(data) {

    console.log(data);
    
    $("#weatherInfoArea").show();
    $(".weatherIconImg").hide();
    $("#currTemp").html(Math.round(data.main.temp));
    $("#tempMinMaxArea").html(data.main.temp_min + " ÂºC / " + data.main.temp_max + " ÂºC");
    // $("#tempMin").html("ìµì : " + data.main.temp_min + " ÂºC");
    // $("#tempMax").html("ìµë: " + data.main.temp_max + " ÂºC");

    var desc = data.weather[0].description;

    var weatherDesc;
    if (desc == "clear sky") {
        weatherDesc = "ë§ì";
        //check time
        $("#weatherSun").show();
    } else if (desc == "few clouds" || desc == "scattered clouds" || desc == "broken clouds") {
        weatherDesc = "íë¦¼";
        //check time
        $("#weatherClouds").show();
    } else if (desc == "shower rain") {
        weatherDesc = "ì´ì¬ë¹";
        $("#weatherShower").show();
    } else if (desc == "rain") {
        weatherDesc = "ë¹";
        $("#weatherRain").show();
    } else if (desc == "thunderstorm") {
        weatherDesc = "í­í";
        $("#weatherStorm").show();
    } else if (desc == "snow") {
        weatherDesc = "ë";
        $("#weatherSnow").show();
    } else if (desc == "mist" || desc == "haze" || desc == "fog") {
        weatherDesc = "ìê°";
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