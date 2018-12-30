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
  if (currHour < 12) {//AM
    if (currHour == 0) {
      currHour = 12;
    }
    var timeOutString = currHour + ":" + currMinute + ":" + currSecond + " AM";
  } else {//PM
    var timeOutString = (currHour - 12) + ":" + currMinute + ":" + currSecond + " PM";
  }
  document.getElementById("timeDisplay").innerHTML = timeOutString;
}, 500);

function checkTime(i)
{
	if (i < 10) {
	   i="0" + i;
	}
	return i;
}
