// for the purpose of the project, the user can only use all functions if all required fields 
// are answered
$(document).ready(checkStorage);
$(storageResetButton).click(resetStorage);

function resetStorage() {
    localStorage.clear();
    location.reload();
}

function checkStorage() {
    if (localStorage.length == 0) {
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
    var widgets = document.getElementsByClassName("widget");
    for(var i = 0; i < widgets.length; i++) {
        widgets.item(i).style.visibility = "visible";
    }
    //display everything else in the main display section

    var displayStr = localStorage.name;
    $("#displayAll").html(displayStr);
    $("#displayAll").fadeIn(3000);

    var endDateStr = calculateEndDate();
    console.log("this" + endDateStr);
}