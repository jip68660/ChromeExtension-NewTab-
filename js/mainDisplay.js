//if nothing in localStorage, ask the question
//if something in the storage, load
$(document).ready(storageCheck);

function storageCheck() {
    console.log('running');

    if (localStorage.getItem('name') == null) {
        //name not in the storage, show question
        document.getElementById("nameIn").style.display = "inline";
        document.getElementById("nameInput").addEventListener("keyup", onNameEnter);
        //above line isn't making it mandatory for the user to enter the name
        //code continue to execute to the following line
        //can we make this like a prompt?
        document.getElementById("nameIn").style.display = "none";
    }
    $("#nameOut").html(localStorage.getItem('name'));
    document.getElementById("nameOut").style.display = "inline";
    localStorage.clear();//to clear localstorage to test function
}

function onNameEnter() {
    if(event.which==13 || event.keycode==13) {
        localStorage.setItem('name', document.getElementById('nameInput').value);
    }
}

// function resetStorage() {
//     console.log("clearing storage?");
//     localStorage.clear();
// }