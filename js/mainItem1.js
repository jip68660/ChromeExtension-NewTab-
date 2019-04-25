$("#profPicUser").click(function() {
    $("#profPicUser").hide();
    $("#moreInfo").show();
});
$("#moreInfo").click(function() {
    $("#profPicUser").show();
    $("#moreInfo").hide();
});

$("#dDayDisplay").click(function() {
    $("#dDayDisplay").hide();
    $("#dDayDisplayBack").show();
});
$("#dDayDisplayBack").click(function() {
    $("#dDayDisplayBack").hide();
    $("#dDayDisplay").show();
});

$(document).ready(function() {

    //모든 이미지 오른쪽 마우스 클릭 금지
    $("img").on("contextmenu",function(){
        return false;
    }); 

    $("body").css({
        "text-align": "center"
    });
    var rankImage = ["img/soldier_PV2.png", "img/soldier_PFC.png", "img/soldier_CPL.png", "img/soldier_SGT.png"];
    var soldierName = localStorage.name;
    var endDateStr = localStorage.endDateYear + "년 " + localStorage.endDateMonth + "월 " + localStorage.endDateDate + "일까지"
    var dDayCount = "D-" + localStorage.todoDays;
    var progressBarWidth = Math.floor((1 - localStorage.getItem("todoDays") / localStorage.getItem("wholeDays")) * 1000) / 10;
    if(!isNaN(progressBarWidth)){
        localStorage.setItem("progressBar", progressBarWidth);
    }
    $("#profPicUser").removeClass("SGT");
    if (!localStorage.rank || localStorage.rank == "rankQ"){
        $("#toRankSettingsButton").show();
        $('#profPicUser').hide();   
    }
    else if (localStorage.rank == "이병"){
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[0]);
    } else if (localStorage.rank == "일병"){
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[1]);
    } else if (localStorage.rank == "상병"){
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[2]);
    } else if (localStorage.rank == "병장"){
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[3]);
        $("#profPicUser").css("width", "38vw"); 
        $("#profPicUser").css("justify-self", "center");
        $("#profPicUser").addClass("SGT");
    }

    if(localStorage.identity == "girlfriend"){
        soldierName = localStorage.loverName;
        $("#nameDisplay").html("남자친구, " + soldierName + "님의 전역일");
    } else{
        $("#nameDisplay").html(soldierName + "님의 전역일");
    }

    if (progressBarWidth < 0){        
        $("#progressBar").css("width", "0%");
        var daysUntilEnlist = Math.floor((new Date(localStorage.enlistDate) - new Date()) / (1000 * 3600 * 24)) + 1;
        var beforeEnlistStr = "에휴...입대까지 " + daysUntilEnlist + "일!";
        $("#dDayDisplay").html(beforeEnlistStr);
        $("#percentageDiv").html("0%");
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[0]);
    } else if (progressBarWidth > 100){
        $("#progressBar").css("width", "100%");
        var daysSinceDischarge = Math.floor((new Date() - new Date(localStorage.endDateYear, localStorage.endDateMonth - 1, localStorage.endDateDate)) / (1000 * 3600 * 24));
        var afterDischargeStr = "전역한지 " + daysSinceDischarge + "일 됐어요... 크흠;";
        $("#dDayDisplay").html(afterDischargeStr);
        $("#percentageDiv").html("100%");
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[3]);
    } else {
        $("#endDateDisplay").html(endDateStr);
        $("#dDayDisplay").html(dDayCount);

        // 배경색에 따른 테마 색깔 선정
        if (localStorage.background ==  "img/mainback1.jpg") {
            $("#progressBar").css("background", "#84638F");            
            $(".font-color").css("color", "#303030");
            $("#progress").css("border", "2px solid #8e8e8e");
            $("#toRankSettingsButton").css("background-color", "#84638F");
            $("#toRankSettingsButton").css("border-color", "#84638F");
        } else if (localStorage.background == "img/mainback2.jpg") {
            $("#progressBar").css("background", "#47d3c3");
        } else if (localStorage.background == "img/mainback3.jpg") {
            $("#progressBar").css("background", "#50dc9b");
        } else if (localStorage.background == "img/mainback4.jpg") {
            $("#progressBar").css("background", "#5c93ad");
        } else if (localStorage.background == "img/mainback5.jpg") {
            $("#progressBar").css("background", "#a5a675");
        } 
        progressBarWidth = progressBarWidth + "%";

        $("#progressBar").css("width", progressBarWidth);
        $("#li_wholeDays").html(localStorage.wholeDays + "일");
        $("#li_reducedDays").html(localStorage.reducedDays + "일");
        $("#li_doneDays").html((localStorage.wholeDays - localStorage.todoDays) + "일");
        $("#li_todoDays").html(localStorage.todoDays + "일");

        // 실시간 업데이트 퍼센트
        var endDateTime = new Date(localStorage.endDateYear, (localStorage.endDateMonth - 1), localStorage.endDateDate);
        var startDateTime = new Date(localStorage.enlistDate);//입대일 오전 9시
        var serviceTimeMS = endDateTime - startDateTime;
        var percentage = (serviceTimeMS - (endDateTime - new Date())) / serviceTimeMS * 100;
        $("#percentageDiv").html(percentage.toFixed(7) + "%");
        
        var percentageInterval = setInterval(function() {
            var percentage = (serviceTimeMS - (endDateTime - new Date())) / serviceTimeMS * 100;
            $("#percentageDiv").html(percentage.toFixed(7) + "%");
            //100% 찍으면 멈추기
            if (percentage > 100) {
                clearInterval();
                $("#percentageDiv").html(100 + "%");
            }
        }, 70);//퍼센트 0.07초마다 업데이트

        var remainingInterval = setInterval(function() {
            //전역일 00:00까지 날짜 차이 실시간 업데이트
            var today = new Date();

            var discharge = new Date(localStorage.endDateYear, localStorage.endDateMonth - 1, localStorage.endDateDate);
            var remainingDays = Math.floor((discharge - today) / (1000 * 3600 * 24));
            var remainingHours = Math.floor((discharge - today) / (1000 * 3600));
            var remainingMinutes = Math.floor((discharge - today) / (1000 * 60));
            var remainingSeconds = Math.floor((discharge - today) / 1000);

            let remainingHoursDisplay = remainingHours - (remainingDays * 24);
            let remainingMinutesDisplay = remainingMinutes - (remainingHours * 60);
            let remainingSecondsDisplay = remainingSeconds - (remainingMinutes * 60);

            $("#timeRemaining").html(remainingDays + "일 " + remainingHoursDisplay + "시간");
            $("#minute1").html(Math.floor(remainingMinutesDisplay / 10));
            $("#minute2").html(remainingMinutesDisplay % 10);
            $("#second1").html(Math.floor(remainingSecondsDisplay / 10));
            $("#second2").html(remainingSecondsDisplay % 10);
        }, 500);//남은 시간 실시간 업데이트

        let today = new Date();
        if (today.getFullYear() == startDateTime.getFullYear() && today.getMonth() == startDateTime.getMonth() && today.getDate() == startDateTime.getDate()) {//오늘이 입대일
            $("#msgDateOf").html("입대일입니다... 화...화이팅...!");
        } else if (today.getFullYear() == endDateTime.getFullYear() && today.getMonth() == endDateTime.getMonth() && today.getDate() == endDateTime.getDate()) {//오늘이 전역일
            $("#msgDateOf").html("전역일입니다. 축하합니다!");
        }
    }
});