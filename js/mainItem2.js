var remainContentArr = ["img/knowingBros.png", "img/baekRestaurant.png", "img/food.jpg", "img/musicBank.jpg", "img/iLiveAlone.png", "img/rollCall.jpg", "img/running.jpg", "img/religion.jpg", "img/foodBread.jpg", "img/rollCallNight.jpg"];
var randomInd = Math.floor(Math.random() * remainContentArr.length);
var leftCountStr = "번";
//전역일 오전 9시를 기준으로 잡음
var endDate = new Date(localStorage.endDateYear, localStorage.endDateMonth - 1, localStorage.endDateDate, 9, 0, 0, 0);

// $("#re").mouseenter(function(){
//     $("#remainContentImg").removeClass("animated flipInX");
//     $('#nextRandom').mousedown(nextRandomContent);
// });

// $('#nextRandom').mousedown(nextRandomContent);

$("#remainContent").click(function() {
    if (!$("#leftCount").hasClass("animated rubberBand")) {
        $("#leftCount").addClass("animated rubberBand");
    }
    nextRandomContent();
});

$(document).ready(function() {
    if (localStorage.background == "img/mainback1.jpg") {
        $(".font-color").css("color", "#303030");
    }
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
        //아는형님, 토요일 21:40
        var targetTime = new Date(curr.getTime());
        targetTime.setDate(curr.getDate() + (7 + 6 - curr.getDay()) % 7);
        targetTime.setHours(21, 40, 0, 0);
    } else if (randomInd == 1) {
        //골목식당, 수요일 23:10
        var targetTime = new Date(curr.getTime());
        targetTime.setDate(curr.getDate() + (7 + 3 - curr.getDay()) % 7);
        targetTime.setHours(23, 10, 0, 0);
    } else if (randomInd == 3 || randomInd == 4) {
        //뮤직뱅크, 금요일 17:40
        if (randomInd == 3){
            var targetTime = new Date(curr.getTime());
            targetTime.setDate(curr.getDate() + (7 + 5 - curr.getDay()) % 7);
            targetTime.setHours(17, 40, 0, 0);
        }
        //나혼자산다, 금요일 23:10
        else if (randomInd == 4){
            var targetTime = new Date(curr.getTime());
            targetTime.setDate(curr.getDate() + (7 + 5 - curr.getDay()) % 7);
            targetTime.setHours(23, 10, 0, 0);
        }
    } else if (randomInd == 7) {
        // 종교, 일요일 10:00
        var targetTime = new Date(curr.getTime());
        targetTime.setDate(curr.getDate() + (7 + 7 - curr.getDay()) % 7);
        targetTime.setHours(10, 0, 0, 0);
    }


    //이미 타겟시간 지났을경우 일주일 뒤로
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
    var rightCountStr;
    if(localStorage.identity=="girlfriend"){
       rightCountStr = "꽃신!";
    } else {  
        rightCountStr = "전역!";
    }
        
    if (randomIndex == 2 || randomIndex == 8) {// 하루에 몇번 하는건 따로 계산
        leftCountStr = "끼";
        // 짬밥, 아침(08:00), 점심(12:00), 저녁(17:30)
        var nextTime1 = getNextDailyTime(new Date(), 8, 0);//아침
        var nextTime2 = getNextDailyTime(new Date(), 12, 0);//점심
        var nextTime3 = getNextDailyTime(new Date(), 17, 30);//저녁

        var remainCount = 0;
        remainCount = currTimeCheck(nextTime1, remainCount);
        remainCount = currTimeCheck(nextTime2, remainCount);
        remainCount = currTimeCheck(nextTime3, remainCount);

        $("#leftCount").html(remainCount + leftCountStr);
        $("#rightCount").html("더 먹으면 " + rightCountStr);
    } else if (randomIndex == 5) { // 아침점호도 따로 계산
        leftCountStr = "번";
        var remainCount = 0;
        var nextTime = getNextDailyTime(new Date(), 7, 0);
        remainCount = currTimeCheck(nextTime, remainCount);

        $("#leftCount").html(remainCount + leftCountStr);
        $("#rightCount").html("더 하면 " + rightCountStr);
    } else if (randomIndex == 9) { // 아침점호도 따로 계산
        leftCountStr = "번";
        var remainCount = 0;
        var nextTime = getNextDailyTime(new Date(), 21, 0);
        remainCount = currTimeCheck(nextTime, remainCount);

        $("#leftCount").html(remainCount + leftCountStr);
        $("#rightCount").html("더 하면 " + rightCountStr);
    } else if (randomIndex == 6) { // 뜀걸음
        leftCountStr = "번";
        var remainCount = 0;
        var nextTime = getNextDailyTime(new Date(), 16, 0); //뜀걸음
        remainCount = currTimeCheck(nextTime, remainCount);

        $("#leftCount").html(remainCount + leftCountStr);
        $("#rightCount").html("더 뛰면 " + rightCountStr);
    } else {//일주일에 한번
        leftCountStr = "번"
        var nextTime = getNextWeeklyTime(new Date());
        var remainCount = 0;
        while ((nextTime) < endDate) {
            ++remainCount;
            nextTime.setDate(nextTime.getDate() + 7);
        }

        $("#leftCount").html(remainCount + leftCountStr);
        if(randomIndex == 7)
            $("#rightCount").html("더 가면 " + rightCountStr);
        else
            $("#rightCount").html("더 보면 " + rightCountStr);
    }

    $("#remainContent").mousedown(function() {
        $("#leftCount").removeClass("animated rubberBand");
    });
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