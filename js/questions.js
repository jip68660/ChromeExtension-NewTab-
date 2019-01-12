// for the purpose of the project, the user can only use all functions if all required fields are answered
$(document).ready(checkStorage);
$(storageResetButton).click(resetStorage);

function resetStorage() {
    localStorage.clear();
}

function checkStorage() {
    if (localStorage.length == 0) {
        // storage is empty, all questions need to be answered
        nameCheck();
    }
    else {
        displayWidgets();
    }
}

function displayWidgets() {
    // this should not be displayed if any of the requried fields are empty
    if (localStorage.getItem('name') != null) {
        var displayStr = localStorage.getItem('name') + "님! 환영합니다.";
        $("#displayAll").html(displayStr);
        $("#displayAll").css("display", "inline");

        var widgets = document.getElementsByClassName("widget");
        for(var i=0; i<widgets.length; i++) {
            widgets.item(i).style.visibility = "visible";
        }
    }
}

