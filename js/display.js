// $(document).ready(nameCheck);

/* NAME */
function nameCheck() {
    // if (localStorage.getItem("name") == null) {
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
        localStorage.setItem("name", document.getElementById("nameInput").value);
        document.getElementById("nameIn").style.display = "none";
        identityCheck();
    }
}

/* IDNETITY */
function identityCheck() {
    document.getElementById("identityIn").style.display = "inline";
    document.getElementById("identityTest").addEventListener("keyup", onIdentityEnter);
}

function onIdentityEnter() {
    if(event.which==13 || event.keycode==13) {
        localStorage.setItem("identity", document.getElementById("identityTest").value);
        document.getElementById("identityIn").style.display = "none";
        branchCheck();
    }
}

/* BRANCH */
function branchCheck() {
    document.getElementById("branchIn").style.display = "inline";
    document.getElementById("branchTest").addEventListener("keyup", onBranchEnter);
}

function onBranchEnter() {
    if(event.which==13 || event.keycode==13) {
        localStorage.setItem("branch", document.getElementById("branchTest").value);
        document.getElementById("branchIn").style.display = "none";
        enlistDateCheck();
    }
}

/* ENLISTDATE */
function enlistDateCheck() {
    document.getElementById("enlistDateIn").style.display = "inline";
    document.getElementById("enlistDateButton").addEventListener("click", onEnlistDateClick);
}

function onEnlistDateClick() {
    localStorage.setItem("enlistDate", document.getElementById("enlistDateIn").value.toDateString());
    //above item value needs to be formatted into string. lookup what date type returns
    document.getElementById("enlistDateIn").style.display = "none";
    displayWidgets();
}



// function displayName() {
//     $("#nameOut").html(localStorage.getItem("name"));
//     document.getElementById("nameIn").style.display = "none";
//     document.getElementById("nameOut").style.display = "inline";
// }