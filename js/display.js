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
        document.getElementById("nameIn").style.display = "none";
        branchCheck();
    }
}

function branchCheck() {
    document.getElementById("branchIn").style.display = "inline";
    document.getElementById("branchTest").addEventListener("keyup", onBranchEnter);
}

function onBranchEnter() {
    if(event.which==13 || event.keycode==13) {
        localStorage.setItem('branch', document.getElementById('branchTest').value);
        document.getElementById("branchIn").style.display = "none";
        displayWidgets();
    }
}

function onBranchClick() {
    localStorage.setItem('branch', document.getElementById('army').value);
}




// function displayName() {
//     $("#nameOut").html(localStorage.getItem('name'));
//     document.getElementById("nameIn").style.display = "none";
//     document.getElementById("nameOut").style.display = "inline";
// }