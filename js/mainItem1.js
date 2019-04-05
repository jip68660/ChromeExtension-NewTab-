$("#profPicUser").click(function() {
    $("#profPicUser").hide();
    $("#moreInfo").show();
});
$("#moreInfo").click(function() {
    $("#profPicUser").show();
    $("#moreInfo").hide();
});

$(document).ready(function() {

    $("body").css({
        "text-align": "center"
    });
    if (localStorage.background == "img/mainback1.jpg") {
        $(".font-color").css("color", "#303030");
        $("#progress").css("border", "2px solid #8e8e8e");
    }
    var rankImage = ["img/soldier_PV2.png", "img/soldier_PFC.png", "img/soldier_CPL.png", "img/soldier_SGT.png"];
    var soldierName = localStorage.name;
    var endDateStr = localStorage.endDateYear + "년 " + localStorage.endDateMonth + "월 " + localStorage.endDateDate + "일까지"
    var dDayCount = "D-" + localStorage.todoDays + "일!";
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
        $("#profPicUser").css("width", "35vw"); 
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

        // 배경색에 따른 진행바 색깔 선정
        if (localStorage.background ==  "img/mainback1.jpg") {
            $("#progressBar").css("background", "#5fc8c8");//teal
        } else if (localStorage.background == "img/mainback2.jpg") {
            $("#progressBar").css("background", "#47d3c3");//teal
        } else if (localStorage.background == "img/mainback3.jpg") {
            $("#progressBar").css("background", "#50dc9b");//teal?green?
        } else if (localStorage.background == "img/mainback4.jpg") {
            $("#progressBar").css("background", "#5c93ad");//blue
        } else if (localStorage.background == "img/mainback5.jpg") {
            $("#progressBar").css("background", "#a5a675");//mustard?
        } 
        // if (progressBarWidth < 20) {
        //     $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(54, 179, 154))");
        // } else if (progressBarWidth < 40) {
        //     $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(44, 158, 135))");
        // } else if (progressBarWidth < 60) {
        //     $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(36, 131, 112)");
        // } else if (progressBarWidth < 80) {
        //     $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(28, 109, 93))");
        // } else {
        //     $("#progressBar").css("background", "linear-gradient(0.25turn, rgb(67, 198, 172), rgb(18, 88, 74))");
        // }
        progressBarWidth = progressBarWidth + "%";

        $("#progressBar").css("width", progressBarWidth);
        $("#li_wholeDays").html(localStorage.wholeDays + "일");
        $("#li_reducedDays").html(localStorage.reducedDays + "일");
        $("#li_doneDays").html((localStorage.wholeDays - localStorage.todoDays) + "일");
        $("#li_todoDays").html(localStorage.todoDays + "일");

        // 실시간 업데이트 퍼센트
        var endDateTime = new Date(localStorage.endDateYear, (localStorage.endDateMonth - 1), localStorage.endDateDate, 8);// 전역일 오전 8시
        var startDateTime = new Date(localStorage.enlistDate);//입대일 오전 9시
        var serviceTimeMS = endDateTime - startDateTime;
        var percentage = (serviceTimeMS - (endDateTime - new Date())) / serviceTimeMS * 100;
        $("#percentageDiv").html(percentage.toFixed(7) + "%");
        window.onload = setInterval(function() {
            var percentage = (serviceTimeMS - (endDateTime - new Date())) / serviceTimeMS * 100;
            $("#percentageDiv").html(percentage.toFixed(7) + "%");
            //100% 찍으면 멈추기
            if (percentage > 100) {
                clearInterval();
                $("#percentageDiv").html(100 + "%");
            }
        }, 70);//퍼센트 0.07초마다 업데이트

        let today = new Date();
        if (today.getFullYear() == startDateTime.getFullYear() && today.getMonth() == startDateTime.getMonth() && today.getDate() == startDateTime.getDate()) {//오늘이 입대일
            $("#msgDateOf").html("입대일입니다... 화...화이팅...!");
        } else if (today.getFullYear() == endDateTime.getFullYear() && today.getMonth() == endDateTime.getMonth() && today.getDate() == endDateTime.getDate()) {//오늘이 전역일
            $("#msgDateOf").html("전역일입니다. 축하합니다!");
        }

        // $("#progressBar").html(progressBarWidth);

        //일단 이 정보 밖으로 빼놔서, comment 시킴.
        // $('[data-toggle="popover"]').popover({
        //     trigger: "hover",
        //     title: "정보",
        //     content: 
        //     '<ul style="list-style: none; padding-left: 0"><li>전체 복무일: ' + localStorage.getItem("wholeDays") 
        //     + '일</li><li>현재 복무일: ' + (localStorage.getItem("wholeDays") - localStorage.getItem("todoDays")) 
        //     + '일</li><li>남은 복무일: ' + localStorage.getItem("todoDays") 
        //     + '일</li><li>단축 복무일: ' + localStorage.getItem("reducedDays") + '일</li></ul>',
        //     html: true
        // });
    }
});