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
        // identityCheck();
        // branchCheck();
        // enlistDateCheck();
    }
    // display all widgets
    displayWidgets();
}

function displayWidgets() {
    // this should not be displayed if any of the requried fields are empty
    if (localStorage.getItem('name') != null) {
        var displayStr = localStorage.getItem('name') + "ë! íìí©ëë¤.";
        $("#displayAll").html(displayStr);
        document.getElementById("displayAll").style.display = "inline";
    }
}