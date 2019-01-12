/* NAME */
function nameCheck() {
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
    document.getElementById("branchSubmit").addEventListener("click", onBranchSelect);
}

/**
 * branch select should store the branch type value in the localStorage upon clicking an option
 * 
 * or 
 * 
 * branch select should wait until Submit button to be pressed so the user has the option to
 * change the branch type -> this seems easier so below is implemented as such
 */
function onBranchSelect() {
    localStorage.setItem("branch", $("input[name=branchRadio]:checked").val());
    document.getElementById("branchIn").style.display = "none";
    enlistDateCheck();
}

/* ENLISTDATE */
function enlistDateCheck() {
    document.getElementById("enlistDateIn").style.display = "inline";
    document.getElementById("enlistDateButton").addEventListener("click", onEnlistDateClick);
}

function onEnlistDateClick() {
    localStorage.setItem("enlistDate", document.getElementById("enlistDateInput").value);
    document.getElementById("enlistDateIn").style.display = "none";
    displayWidgets();
}