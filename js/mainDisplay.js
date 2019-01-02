$(document).ready(storageCheck);
$(storageResetButton).click(resetStorage);

function storageCheck() {
    console.log('running');

    if (localStorage.getItem('name') == null) {
        document.getElementById("nameIn").style.display = "inline";
        document.getElementById("nameInput").addEventListener("keyup", onNameEnter);
    } else {
        displayName();
    }
}

function onNameEnter() {
    if(event.which==13 || event.keycode==13) {
        localStorage.setItem('name', document.getElementById('nameInput').value);
        displayName();
    }
}

function displayName() {
    $("#nameOut").html(localStorage.getItem('name'));
    document.getElementById("nameIn").style.display = "none";
    document.getElementById("nameOut").style.display = "inline";
}

function resetStorage() {
    console.log("clearing storage?");
    localStorage.clear();
}