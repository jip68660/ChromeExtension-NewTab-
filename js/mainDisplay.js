// for the purpose of the project, the user can only use all functions if all required fields 
// are answered
$(document).ready(checkStorage);
$(storageResetButton).click(resetStorage);

function resetStorage() {
    localStorage.clear();
}

function checkStorage() {
    if (localStorage.length == 0) {
        // storage is empty, start question queue with the name question
        nameCheck();
    } else {
        displayWidgets();
    }
}

function displayWidgets() {
    // this should not be displayed if any of the requried fields are empty
    if (localStorage.getItem('name') != null) {
        var displayStr = localStorage.getItem('name') + "ë! íìí©ëë¤.";
        $("#displayAll").html(displayStr);
        $("#displayAll").css("display", "inline");

        var widgets = document.getElementsByClassName("widget");
        for(var i=0; i<widgets.length; i++) {
            widgets.item(i).style.visibility = "visible";
        }
    } else {
        alert("ìë ¥íì§ ìì ì ë³´ê° ììµëë¤.");
    }
}