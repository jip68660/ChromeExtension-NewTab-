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
  weekday[0] = "일";
  weekday[1] = "월";
  weekday[2] = "화";
  weekday[3] = "수";
  weekday[4] = "목"";
  weekday[5] = "금";
  weekday[6] = "토";

  var dateOutString = currYear + "년 " + (currMonth + 1) + "월 " + currDate
  + "일 \(" + weekday[currDay] + "\)";
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
