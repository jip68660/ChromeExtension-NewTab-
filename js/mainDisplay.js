// for the purpose of the project, the user can only use all functions if all required fields 
// are answered
$(document).ready(checkStorage);
$(storageResetButton).click(resetStorage);

// 정보를 입력받았을 때만 환영합니다 띄우고 3초 후 보여주고, 새로고침 or 새 탭 시에는 바로 띄우게 하기 위한 변수
var timeoutCheck;

function resetStorage() {
    localStorage.clear();
    location.reload();
}

function checkStorage() {
    if (localStorage.length == 0) {
        // 정보 입력을 받았을 때만 timeoutCheck를 1로 바꿔줘서 3초 딜레이
        timeoutCheck = 1;
        // storage is empty, start question queue with the name question
        nameCheck();
    } else {
        displayWidgets();
    }
}

function initDoneDisplay() {
    // this should not be displayed if any of the requried fields are empty
    if (localStorage.name != "" && localStorage.identity != "" && localStorage.branch != "" && localStorage.enlistDate != "") {
        var welcomeStr = "환영합니다";
        $("#welcomeMsg").html(welcomeStr);
        $("#welcomeMsg").css("display", "inline");
        $("#welcomeMsg").fadeOut(3000, displayWidgets());
    } else {
        alert("모든 정보를 입력하지 않았습니다.");
    }
}

function displayWidgets() {
    //display everything else in the main display section

    if(timeoutCheck==1) {
        console.log(timeoutCheck);
        var timeoutVar = setTimeout(displayAllFunc,3000);
    }
    else {
        displayAllFunc();
    }

    var endDateStr = calculateEndDate();
    console.log("this" + endDateStr);
}

function displayAllFunc() {
    var displayStr = localStorage.name;

    $("#displayAll").html(displayStr);
    $("#displayAll").css("display","inline");
    $(".widget").css("visibility","visible");
}