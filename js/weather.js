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
                    console.log(data);
                }
            });
        } else {
            $('#error').html('Field cannot be empty');
        }
    });

});