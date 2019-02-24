$(document).ready(function() {

    $("body").css({
        "text-align": "center"
    });

    var rankImage = ["img/soldier_PV2.png", "img/soldier_PFC.png", "img/soldier_CPL.png", "img/soldier_SGT.png"];
    var soldierName = localStorage.name;
    var endDateStr = localStorage.endDateYear + "ë " + localStorage.endDateMonth + "ì " + localStorage.endDateDate + "ì¼ê¹ì§"
    var dDayCount = "D-" + localStorage.todoDays + "ì¼!";
    var progressBarWidth = Math.floor((1 - localStorage.getItem("todoDays") / localStorage.getItem("wholeDays")) * 1000) / 10;
    if(!isNaN(progressBarWidth)){
        localStorage.setItem("progressBar", progressBarWidth);
    }

    if (localStorage.rank == "ì´ë³"){
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[0]);
    } else if (localStorage.rank == "ì¼ë³"){
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[1]);
    } else if (localStorage.rank == "ìë³"){
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[2]);
    } else if (localStorage.rank == "ë³ì¥"){
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[3]);
    } else {
        $("#toRankSettingsButton").show();
    }

    if(localStorage.identity == "girlfriend"){
        soldierName = localStorage.loverName;
        $("#nameDisplay").html("ë¨ìì¹êµ¬, " + soldierName + "ëì ì ì­ì¼");
    } else{
        $("#nameDisplay").html(soldierName + "ëì ì ì­ì¼");
    }

    if (progressBarWidth < 0){        
        $("#progressBar").css("width", "0%");
        $("#dDayDisplay").html("ìí´... ëì²´ ìì ì¸ì í´ì, ëì²´?");
        $("#percentageDiv").html("0%");
        $("#toRankSettingsButton").hide();
        $("#profPicUser").attr("src", rankImage[0]);
    } else if (progressBarWidth > 100){
        $("#progressBar").css("width", "100%");
        $("#dDayDisplay").html("ì ìì§ë ê³ì¸ì? ì¼ë¥¸ ê°ì¸ì");
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

        // ì¤ìê° ìë°ì´í¸ í¼ì¼í¸
        var endDateTime = new Date(localStorage.endDateYear, (localStorage.endDateMonth - 1), localStorage.endDateDate, 8);// ì ì­ì¼ ì¤ì  8ì
        var startDateTime = new Date(localStorage.enlistDate);//ìëì¼ ì¤ì  9ì
        var serviceTimeMS = endDateTime - startDateTime;
        var percentage = (serviceTimeMS - (endDateTime - new Date())) / serviceTimeMS * 100;
        $("#percentageDiv").html(percentage.toFixed(7) + "%");
        window.onload = setInterval(function() {
            var percentage = (serviceTimeMS - (endDateTime - new Date())) / serviceTimeMS * 100;
            $("#percentageDiv").html(percentage.toFixed(7) + "%");
        }, 70);//í¼ì¼í¸ 0.07ì´ë§ë¤ ìë°ì´í¸
        // $("#progressBar").html(progressBarWidth);

        //ì¼ë¨ ì´ ì ë³´ ë°ì¼ë¡ ë¹¼ëì, comment ìí´.
        // $('[data-toggle="popover"]').popover({
        //     trigger: "hover",
        //     title: "ì ë³´",
        //     content: 
        //     '<ul style="list-style: none; padding-left: 0"><li>ì ì²´ ë³µë¬´ì¼: ' + localStorage.getItem("wholeDays") 
        //     + 'ì¼</li><li>íì¬ ë³µë¬´ì¼: ' + (localStorage.getItem("wholeDays") - localStorage.getItem("todoDays")) 
        //     + 'ì¼</li><li>ë¨ì ë³µë¬´ì¼: ' + localStorage.getItem("todoDays") 
        //     + 'ì¼</li><li>ë¨ì¶ ë³µë¬´ì¼: ' + localStorage.getItem("reducedDays") + 'ì¼</li></ul>',
        //     html: true
        // });
    }
});