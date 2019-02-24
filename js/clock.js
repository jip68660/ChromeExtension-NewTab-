var toggleBool = true;

window.onload = setInterval(function() {
  var today = new Date();
  var currYear = today.getFullYear();
  var currMonth = today.getMonth();
  var currDate = today.getDate();
  var currDay = today.getDay();
  var currHour = today.getHours();
  var currMinute = today.getMinutes();
  var currSecond = today.getSeconds();

  currHour = checkTime(currHour);
  currMinute = checkTime(currMinute);
  currSecond = checkTime(currSecond);

  var weekday = new Array(7);
  weekday[0] = "ì¼";
  weekday[1] = "ì";
  weekday[2] = "í";
  weekday[3] = "ì";
  weekday[4] = "ëª©";
  weekday[5] = "ê¸";
  weekday[6] = "í ";

  var dateOutString = currYear + "ë " + (currMonth + 1) + "ì " + currDate
  + "ì¼ \(" + weekday[currDay] + "\)";
  document.getElementById("dateDisplay").innerHTML = dateOutString;

  var timeOutString1;
  var timeOutString2;

  if (localStorage.timeOpt == "12hr") {//12ìê° ìµì
    if (currHour < 12) {//AM
      if (currHour == 0) {
        currHour = 12;
      }
      if (currHour - 10 < 0) {
        // timeOutString = "0" + currHour + ":" + currMinute + " AM";
        timeOutString1 = currHour;
        // timeOutString2 = currMinute + " AM";
        timeOutString2 = currMinute 
        $("#amOrPm").html("AM");
      } else {
        timeOutString1 = currHour;
        // timeOutString2 = currMinute + " AM";
        timeOutString2 = currMinute
        $("#amOrPm").html("AM");
      }
    } else {//PM
      if (currHour == 12) {
        timeOutString1 = currHour;
        // timeOutString2 = currMinute + " PM";
        timeOutString2 = currMinute
        $("#amOrPm").html("PM");
      } else {
        currHour = currHour - 12;
        if (currHour - 10 < 0) {
          timeOutString1 = "0" + currHour;
          // timeOutString2 = currMinute + " PM";
          timeOutString2 = currMinute
          $("#amOrPm").html("PM");
        } else {
          timeOutString1 = currHour;
          // timeOutString2 = currMinute + " PM";
          timeOutString2 = currMinute
          $("#amOrPm").html("PM");
        }
      }
    }
  } else if (localStorage.timeOpt == "24hr") {//24ìê° ìµì
      timeOutString1 = currHour;
      timeOutString2 = currMinute;
  }


  document.getElementById("timeDisplay1").innerHTML = timeOutString1;
  document.getElementById("timeDisplay2").innerHTML = timeOutString2;
  if (toggleBool) {
    $("#timeColon").css("visibility", "visible");
    toggleBool = false;
  } else {
    $("#timeColon").css("visibility", "hidden");
    toggleBool = true;
  }
}, 500);

function checkTime(i)
{
	if (i < 10) {
	   i="0" + i;
	}
	return i;
}
