$(document).ready(function() {

    $("body").css({
        "text-align": "center"
    });

    var rankImage = ["img/soldier_PV2.png", "img/soldier_PFC.png", "img/soldier_CPL.png", "img/soldier_SGT.png"];
    var soldierName = localStorage.name;
    var endDateStr = localStorage.endDateYear + "년 " + localStorage.endDateMonth + "월 " + localStorage.endDateDate + "일까지"
    var dDayCount = "D-" + localStorage.todoDays + "일!";
    var progressBarWidth = Math.floor((1 - localStorage.getItem("todoDays") / localStorage.getItem("wholeDays")) * 1000) / 10;
    if(!isNaN(progressBarWidth)){
        localStorage.setItem("progressBar", progressBarWidth);
    }

    if (localStorage.rank == "이병"){
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
    } else {
        $("#toRankSettingsButton").show();
    }

    if(localStorage.identity == "girlfriend"){
        soldierName = localStorage.loverName;
        $("#nameDisplay").html("남자친구, " + soldierName + "님의 전역일");
    } else{
        $("#nameDisplay").html(soldierName + "님의 전역일");
    }

    if (progressBarWidth < 0){        
        $("#progressBar").css("width", "0%");
        $("#dDayDisplay").html("에휴... 대체 시작 언제해요, 대체?");
        $("#percentageDiv").html("0%");
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[0]);
    } else if (progressBarWidth > 100){
        $("#progressBar").css("width", "100%");
        $("#dDayDisplay").html("왜 아직도 계세요? 얼른 가세요");
        $("#percentageDiv").html("100%");
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[3]);
    } else {
        $("#endDateDisplay").html(endDateStr);
        $("#dDayDisplay").html(dDayCount);
        if (progressBarWidth < 20) {
            $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(54, 179, 154))");
        } else if (progressBarWidth < 40) {
            $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(44, 158, 135))");
        } else if (progressBarWidth < 60) {
            $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(36, 131, 112)");
        } else if (progressBarWidth < 80) {
            $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(28, 109, 93))");
        } else {
            $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(18, 88, 74))");
        }
        progressBarWidth = progressBarWidth + "%";

        $("#progressBar").css("width", progressBarWidth);
        $("#li_wholeDays").html(localStorage.wholeDays);
        $("#li_reducedDays").html(localStorage.reducedDays);
        $("#li_doneDays").html(localStorage.wholeDays - localStorage.todoDays);
        $("#li_todoDays").html(localStorage.todoDays);

        // 실시간 업데이트 퍼센트
        var endDateTime = new Date(localStorage.endDateYear, (localStorage.endDateMonth - 1), localStorage.endDateDate, 8);// 전역일 오전 8시
        var startDateTime = new Date(localStorage.enlistDate);//입대일 오전 9시
        var serviceTimeMS = endDateTime - startDateTime;
        var percentage = (serviceTimeMS - (endDateTime - new Date())) / serviceTimeMS * 100;
        $("#percentageDiv").html(percentage.toFixed(7) + "%");
        window.onload = setInterval(function() {
            var percentage = (serviceTimeMS - (endDateTime - new Date())) / serviceTimeMS * 100;
            $("#percentageDiv").html(percentage.toFixed(7) + "%");
        }, 70);//퍼센트 0.07초마다 업데이트
        // $("#progressBar").html(progressBarWidth);

        //일단 이 정보 밖으로 빼놔서, comment 시킴.
        $('[data-toggle="popover"]').popover({
            trigger: "hover",
            title: "정보",
            content: 
            '<ul style="list-style: none; padding-left: 0"><li>전체 복무일: ' + localStorage.getItem("wholeDays") 
            + '일</li><li>현재 복무일: ' + (localStorage.getItem("wholeDays") - localStorage.getItem("todoDays")) 
            + '일</li><li>남은 복무일: ' + localStorage.getItem("todoDays") 
            + '일</li><li>단축 복무일: ' + localStorage.getItem("reducedDays") + '일</li></ul>',
            html: true
        });
    }
});