var remainContentArr = ["img/knowingBros.jpg", "img/baekRestaurant.jpg", "img/food.jpg", "img/musicBank.jpg"];
var randomInd = Math.floor(Math.random() * remainContentArr.length);
var leftCountStr = "ë²";
//ì ì­ì¼ ì¤ì  9ìë¥¼ ê¸°ì¤ì¼ë¡ ì¡ì
var endDate = new Date(localStorage.endDateYear, localStorage.endDateMonth - 1, localStorage.endDateDate, 9, 0, 0, 0);

// $("#re").mouseenter(function(){
//     $("#remainContentImg").removeClass("animated flipInX");
//     $('#nextRandom').mousedown(nextRandomContent);
// });
$('#nextRandom').mousedown(nextRandomContent);
$(document).ready(function() {

    $("body").css({
        "text-align": "center"
    });

    $("#remainContentImg").attr("src", remainContentArr[randomInd]);
    // $("#remainContentImg").css("width", "45%");

    leftCountCal(randomInd);

});

function getNextWeeklyTime(curr) {
    // GETDAY() -> [SUN, MON, TUE, WED, THURS, FRI, SAT]
    if (randomInd == 0) {
        //ìëíë, í ìì¼ 21:40
        var targetTime = new Date(curr.getTime());
        targetTime.setDate(curr.getDate() + (7 + 6 - curr.getDay()) % 7);
        targetTime.setHours(21, 40, 0, 0);
    } else if (randomInd == 1) {
        //ê³¨ëª©ìë¹, ììì¼ 23:10
        var targetTime = new Date(curr.getTime());
        targetTime.setDate(curr.getDate() + (7 + 3 - curr.getDay()) % 7);
        targetTime.setHours(23, 10, 0, 0);
    } else if (randomInd == 3) {
        //ë®¤ì§ë±í¬, ê¸ìì¼ 17:40
        var targetTime = new Date(curr.getTime());
        targetTime.setDate(curr.getDate() + (7 + 5 - curr.getDay()) % 7);
        targetTime.setHours(17, 40, 0, 0);
    } 

    //ì´ë¯¸ íê²ìê° ì§ë¬ìê²½ì° ì¼ì£¼ì¼ ë¤ë¡
    if (curr > targetTime) {
        targetTime.setDate(curr.getDate() + 7);
    }

    return targetTime;
}

function getNextDailyTime(curr, mealHour, mealMinute) {
    var targetTime = new Date(curr.getTime());
    targetTime.setHours(mealHour, mealMinute, 0, 0);
    if (curr > targetTime) {
        targetTime.setDate(curr.getDate() + 1);
    }
    return targetTime;
}

function currTimeCheck(nextTime, remainCount) {
    while ((nextTime) < endDate) {
        ++remainCount;
        nextTime.setDate(nextTime.getDate() + 1);
    }
    return remainCount;
}

function leftCountCal(randomIndex) {
    if (randomIndex == 2) {// íë£¨ì ëªë² íëê±´ ë°ë¡ ê³ì°
        leftCountStr = "ë¼ë";
        // ì§¬ë°¥, ìì¹¨(08:00), ì ì¬(12:00), ì ë(17:30)
        var nextTime1 = getNextDailyTime(new Date(), 8, 0);//ìì¹¨
        var nextTime2 = getNextDailyTime(new Date(), 12, 0);//ì ì¬
        var nextTime3 = getNextDailyTime(new Date(), 17, 30);//ì ë

        var remainCount = 0;
        remainCount = currTimeCheck(nextTime1, remainCount);
        remainCount = currTimeCheck(nextTime2, remainCount);
        remainCount = currTimeCheck(nextTime3, remainCount);
    } else {//ì¼ì£¼ì¼ì íë²
        leftCountStr = "ë²"
        var nextTime = getNextWeeklyTime(new Date());
        var remainCount = 0;
        while ((nextTime) < endDate) {
            ++remainCount;
            nextTime.setDate(nextTime.getDate() + 7);
        }
    }

    $("#leftCount").html(remainCount + leftCountStr);
}

function nextRandomContent(){
    var randomIndNext = Math.floor(Math.random() * remainContentArr.length);
    while (randomInd == randomIndNext){        
        randomIndNext = Math.floor(Math.random() * remainContentArr.length);
    }
    randomInd = randomIndNext;
    // $("#remainContentImg").addClass("animated flipInX");
    $("#remainContentImg").attr("src", remainContentArr[randomInd]);
    leftCountCal(randomInd);
}