// $(document).ready(nameCheck);

function nameCheck() {
    // if (localStorage.getItem('name') == null) {
    //     document.getElementById("nameIn").style.display = "inline";
    //     document.getElementById("nameInput").addEventListener("keyup", onNameEnter);
    // } else {
    //     displayName();
    // }
    document.getElementById("nameIn").style.display = "inline";
    document.getElementById("nameInput").addEventListener("keyup", onNameEnter);
}

function onNameEnter() {
    if(event.which==13 || event.keycode==13) {
        localStorage.setItem('name', document.getElementById('nameInput').value);
        hideNameQ();
    }
}

function hideNameQ() {
    document.getElementById("nameIn").style.display = "none";
}

// function displayName() {
//     $("#nameOut").html(localStorage.getItem('name'));
//     document.getElementById("nameIn").style.display = "none";
//     document.getElementById("nameOut").style.display = "inline";
// }