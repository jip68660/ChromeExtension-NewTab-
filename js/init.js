var currDate = new Date();
var currY = currDate.getFullYear();
var currM = currDate.getMonth() + 1;
var currD = currDate.getDate();
var branchSelected;
var identitySelected;

/* ENTERë¡ ë¤ì ì§ë¬¸ ëì´ê°ê¸° */
// function onEnterPressed() {
//     urlString = document.getElementById("searchBar").value;
//     if(event.which==13 || event.keycode==13) {
//         search();
//     }
// }
$("#enlistY").mousedown(enlistYActive);
$("#enlistM").mousedown(enlistMActive);
$("#enlistD").mousedown(enlistDActive);

/* NAME */
function nameCheck() {
    $("#nameIn2").addClass("animated fadeInUp");
    $("#nameIn").show();

    setTimeout(function() {
        $("#nameIn1").fadeOut(1000, function() {
            $("#nameIn2").show();
        });
    }, 1200);
    document.getElementById("nameInput").addEventListener("keyup", onNameEnter);
}
function onNameEnter() {
    if(event.which==13 || event.keycode==13) {
        if ($("#nameInput").val() == ""){
            alert("ì´ë¦ì ì ì´ì£¼ì¸ì");
        }
        else{
            localStorage.setItem("name", document.getElementById("nameInput").value);
            
            $("#nameIn2").removeClass("fadeInUp");
            $("#nameIn2").addClass("fadeOutUp");
            setTimeout(function() {
                $("#nameIn").hide();
                identityCheck();
            }, 1000);
        }
    }
}

/* IDENTITY */
function identityCheck() {
    $("#identityIn").show();
    setTimeout(function() {
        $("#identityInput").css("visibility", "visible");
        $("#identityInput").addClass("animated fadeInUp");
    }, 700);

    $("#identitySoldierImg").mousedown(function() {
        $(".identity").removeClass("selected");
        $("#identitySoldierImg").addClass("selected");
        identitySelected = $("#identitySoldierImg").val();
    });
    $("#identityGirlfriendImg").mousedown(function() {
        $(".identity").removeClass("selected");
        $("#identityGirlfriendImg").addClass("selected");
        identitySelected = $("#identityGirlfriendImg").val();
    });
    $("#identitySubmit").click(onIdentitySelect);
    document.getElementById("identityInput").addEventListener("keyup", onIdentitySelectKey);
}
function onIdentitySelect() {
    if (identitySelected!=undefined) {
        localStorage.setItem("identity", identitySelected);
    }
    if (!localStorage.identity || localStorage.identity == "") {
        alert("ì ë¶ì ì íí´ì£¼ì¸ì");
    } else {
        onIdentityInEnd();
    }
}
function onIdentitySelectKey() {//enter ëë ìë ì¤ì  ê°ë¥, ìë¬´ê²ë ì ëë¦°ìíììë enterê° ìì ì ë¨¹ì -> alert íì ìì
    if(event.which==13 || event.keycode==13) {
        onIdentityInEnd();
    }
}
function onIdentityInEnd() {//ëë ë í¨ê³¼ + ë¡ì»¬ì ì ì¥
    localStorage.setItem("identity", identitySelected);

    $("#identityIn").addClass("animated fadeOutUp");
    setTimeout(function() {
        $("#identityIn").hide();
        if (localStorage.identity == "soldier"){
            girlfriendCheck();
        } else {
            loverNameCheck();
        }
    }, 1000);
}

/* GIRLFRIENDCHECK, IF IDENTITY = SOLDIER*/
function girlfriendCheck() {
    $("#girlfriendIn").show();
    setTimeout(function() {
        $("#girlfriendInput").css("visibility", "visible");
        $("#girlfriendInput").addClass("animated fadeInUp");
    }, 700);

    $("#girlfriendSubmit").click(onGirlfriendSelect);
    document.getElementById("girlfriendInput").addEventListener("keyup", onGirlfriendSelectKey);
}
function onGirlfriendSelect() {
    if (!($("input[name=girlfriendRadio]:checked").val())) {
        alert("í­ëª©ì ì íí´ì£¼ì¸ì");
    } else {
        onGirlfriendInEnd();
    }
}
function onGirlfriendSelectKey() {//enter press
    if (event.which == 13 || event.keycode == 13) {
        onGirlfriendInEnd();
    }
}
function onGirlfriendInEnd() {
    localStorage.setItem("girlfriendYN", $("input[name=girlfriendRadio]:checked").val());

    $("#girlfriendIn").addClass("animated fadeOutUp");
    setTimeout(function() {
        $("#girlfriendIn").hide();
        if (localStorage.girlfriendYN == "yes") {
            loverNameCheck();
        } else {
            branchCheck();
        }
    }, 1000);
}

/* GET LOVER NAME, IF IDENTITY=SOLDIER & GF=YES OR IDENTITY=GF*/
function loverNameCheck() {
    $("#loverNameIn").addClass("animated fadeInUp");
    $("#loverNameIn").show();
    
    document.getElementById("loverNameInput").addEventListener("keyup", onLoverNameEnter);
    if (localStorage.identity == "girlfriend"){
        $(".fitQuestion").html("ë¨ìì¹êµ¬ì ");
    }
    else{
        $(".fitQuestion").html("ì¬ìì¹êµ¬ì ");
    }
}
function onLoverNameEnter() {
    if(event.which==13 || event.keycode==13) {
        if ($("#loverNameInput").val() == ""){
            alert("ì´ë¦ì ì ì´ì£¼ì¸ì");
        } else {
            onLoverNameInEnd();
        }
    }
}
function onLoverNameInEnd() {
    localStorage.setItem("loverName", document.getElementById("loverNameInput").value);

    $("#loverNameIn").removeClass("fadeInUp");
    $("#loverNameIn").addClass("fadeOutUp");
    setTimeout(function() {
        $("#loverNameIn").hide();
        relStartDateCheck();
    }, 1000);
}

/* GET THE START DATE OF THE RELATIONSHIP, FOR GF AND SOLDIER W/ GF */
/** TODO
 * ìëì¼ ë°ëê±°ì²ë¼ ë°ê¿ì£¼ê¸°
 * */
function relStartDateCheck() {
    $("#relStartDateIn").show();
    setTimeout(function() {
        $("#relStartDateInput").css("visibility", "visible");
        $("#relStartDateInput").addClass("animated fadeInUp");
    }, 700);

    $("#relStartDateSubmit").click(onRelStartDateClick);
    if (localStorage.identity == "girlfriend"){
        $(".fitQuestion").html("ë¨ìì¹êµ¬ì ");
    }
    else{
        $(".fitQuestion").html("ì¬ìì¹êµ¬ì ");
    }
}
function onRelStartDateClick() {
    if ($("#relStartDate").val()=="") {
        alert("ë ì§ë¥¼ ìë ¥í´ì£¼ì¸ì");
    }
    else {
        onRelStartDateInEnd();
    }
}
function onRelStartDateInEnd() {
    localStorage.setItem("relStartDate", $("#relStartDate").val());
    localStorage.setItem("switchOnOff", "on");//ì°ì¸ì¼ ê²½ì° ì°ë¦¬ì¬ì´ íì±í
    
    $("#relStartDateIn").addClass("animated fadeOutUp");
    setTimeout(function() {
        $("#relStartDateIn").hide();
        branchCheck();
    }, 1000);
}

/* BRANCH */
function branchCheck() {
    $("#branchIn").show();
    setTimeout(function() {
        $("#branchInput").css("visibility", "visible");
        $("#branchInput").addClass("animated fadeInUp");
    }, 700);

    if (localStorage.identity == "girlfriend"){
        $(".fitQuestion").html("ë¨ìì¹êµ¬ì ");
    }
    else{
        $(".fitQuestion").html("");
    }
    $("#army").mousedown(function() {
        $(".branch").removeClass("selected");
        $("#army").addClass("selected");
        branchSelected = $("#army").attr("id");
    });
    $("#navy").mousedown(function() {
        $(".branch").removeClass("selected");
        $("#navy").addClass("selected");
        branchSelected = $("#navy").attr("id");
    });
    $("#airForce").mousedown(function() {
        $(".branch").removeClass("selected");
        $("#airForce").addClass("selected");
        branchSelected = $("#airForce").attr("id");
    });
    $("#marine").mousedown(function() {
        $(".branch").removeClass("selected");
        $("#marine").addClass("selected");
        branchSelected = $("#marine").attr("id");
    });
    $("#socialService").mousedown(function() {
        $(".branch").removeClass("selected");
        $("#socialService").addClass("selected");
        branchSelected = $("#socialService").attr("id");
    });
    $("#police").mousedown(function() {
        $(".branch").removeClass("selected");
        $("#police").addClass("selected");
        branchSelected = $("#police").attr("id");
    });

    $("#branchSubmit").click(onBranchSelect);
    document.getElementById("branchInput").addEventListener("keyup", onBranchSelectKey);//ì´ê² ì ë¨¹ì...
}
function onBranchSelect() {
    // localStorage.setItem("branch", $("input[name=branchRadio]:checked").val());
    // document.getElementById("branchIn").style.display = "none";
    // enlistDateCheck();
    if (branchSelected != undefined) {
        localStorage.setItem("branch", branchSelected);
    }
    if (!localStorage.branch || localStorage.branch == "") {
        alert("ììì ì íí´ì£¼ì¸ì");
    } else {
        onBranchInEnd();
    }
}
function onBranchSelectKey() {
    if (branchSelected != undefined) {
        localStorage.setItem("branch", branchSelected);
    }
    if  (event.which==13 || event.keycode==13) {
        if (!localStorage.branch || localStorage.branch == "") {
            alert("ììì ì íí´ì£¼ì¸ì");
        } else {
            onBranchInEnd();
        }
    }
}
function onBranchInEnd() {
    localStorage.setItem("branch", branchSelected);
    
    $("#branchIn").addClass("animated fadeOutUp");
    setTimeout(function() {
        $("#branchIn").hide();
        enlistDateCheck();
    }, 1000);
}

var mouseLocation, mouseDown;

// ëë ì í
function currYPlus() {
    mouseDown = true;
    $("#upPointer1").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != upPointerBtn1)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currYPlusAuto, 100);
        }, 1000);
    }

    return false;
}
function currYPlusAuto() {
    $("#upPointer1").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != upPointerBtn1)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        $("#enlistYInput").val(++currY);
        setTimeout(currYPlusAuto, 100);
    }
}
function currYMinus() {
    mouseDown = true;
    $("#downPointer1").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != downPointerBtn1)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currYMinusAuto, 100);
        }, 1000);
    }

    return false;
}
function currYMinusAuto() {
    $("#downPointer1").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != downPointerBtn1)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        $("#enlistYInput").val(--currY);
        setTimeout(currYMinusAuto, 100);
    }
}

// ì ì í
function currMPlus() {
    mouseDown = true;
    $("#upPointer2").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != upPointerBtn2)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currMPlusAuto, 100);
        }, 1000);
    }

    return false;
}
function currMPlusAuto() {
    $("#upPointer2").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != upPointerBtn2)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currM == 12) {
            currM = 0;
        }
        $("#enlistMInput").val(++currM);
        setTimeout(currMPlusAuto, 100);
    }
}
function currMMinus() {
    mouseDown = true;
    $("#downPointer2").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != downPointerBtn2)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currMMinusAuto, 100);
        }, 1000);
    }

    return false;
}
function currMMinusAuto() {
    $("#downPointer2").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != downPointerBtn2)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currM == 1) {
            currM = 13;
        }
        $("#enlistMInput").val(--currM);
        setTimeout(currMMinusAuto, 100);
    }
}

// ì¼ ì í
function currDPlus() {
    mouseDown = true;
    $("#upPointer3").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != upPointerBtn3)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currDPlusAuto, 100);
        }, 1000);
    }

    return false;
}
function currDPlusAuto() {
    $("#upPointer3").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != upPointerBtn3)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currD == 31) {
            currD = 0;
        }
        $("#enlistDInput").val(++currD);
        setTimeout(currDPlusAuto, 100);
    }
}
function currDMinus() {
    mouseDown = true;
    $("#downPointer3").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != downPointerBtn3)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currDMinusAuto, 100);
        }, 1000);
    }

    return false;
}
function currDMinusAuto() {
    $("#downPointer3").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != downPointerBtn3)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currD == 1) {
            currD = 31;
        }
        $("#enlistDInput").val(--currD);
        setTimeout(currDMinusAuto, 100);
    }
}

/* ENLISTDATE */
function enlistDateCheck() {
    $("#enlistDateIn").show();
    setTimeout(function() {
        $("#enlistDateInput").css("visibility", "visible");
        $("#enlistDateInput").addClass("animated fadeInUp");
    }, 700);
    document.getElementById("enlistDateButton").addEventListener("click", onEnlistDateClick);

    //default
    enlistYActive();

    // year update
    $("#enlistYInput").val(currY);
    $("#enlistYInput").select();
    $("#upPointer1").mousedown(function(){
        $("#enlistYInput").val(++currY);
        currYPlus();
    });

    $("#downPointer1").mousedown(function(){
        $("#enlistYInput").val(--currY);
        currYMinus();
    });       
    $("#enlistY").keydown(function(){
        if (event.which == 38 || event.keycode == 38) {
            $("#enlistYInput").val(++currY);
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#enlistYInput").val(--currY);
        }
        else if (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {
            currY = $("#enlistYInput").val();
            enlistMActive();
            $("#enlistMInput").select();
        }
    });

    // month update
    $("#enlistMInput").val(currM);
    $("#enlistMInput").select();
    $("#upPointer2").mousedown(function(){
        $("#enlistMInput").val(++currM);
        if (currM > 12){
            currM = 0;
            $("#enlistMInput").val(++currM);
        }
        currMPlus();
    });
    $("#downPointer2").mousedown(function(){
        $("#enlistMInput").val(--currM );
        if (currM <= 0){
            currM = 13;
            $("#enlistMInput").val(--currM);
        }
        currMMinus();
    });
    $("#enlistM").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#enlistMInput").val(++currM);
            if (currM > 12){
                currM = 0;
                $("#enlistMInput").val(++currM);
            }   
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#enlistMInput").val(--currM);
            if (currM <= 0){
                currM = 13;
                $("#enlistMInput").val(--currM);
            }
        }
        else if  (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {             
            currM = $("#enlistMInput").val();
            enlistDActive();
            $("#enlistDInput").select();
        }
        else if(event.which==37 || event.keycode==37) {
            enlistYActive();
            $("#enlistYInput").select();
        }
    });

    // date update
    $("#enlistDInput").val(currD);
    $("#enlistDInput").select();
    $("#upPointer3").mousedown(function(){
        $("#enlistDInput").val(++currD);
        if (currD > 31){
            currD = 0;
            $("#enlistDInput").val("  " + ++currD);
        }
        currDPlus();
    });
    $("#downPointer3").mousedown(function(){
        $("#enlistDInput").val(--currD);
        if (currD <= 0){
            currD = 32;
            $("#enlistDInput").val("  " + --currD);
        }
        currDMinus();
    });
    $("#enlistD").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#enlistDInput").val(++currD);
            if (currD > 31){
                currD = 0;
                $("#enlistDInput").val("  " + ++currD);
            }
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#enlistDInput").val(--currD);
            if (currD <= 0){
                currD = 32;
                $("#enlistDInput").val("  " + --currD);
            }
        }  
        else if  (event.which==13 || event.keycode==13) {                           
            currD = $("#enlistDInput").val()           
            onEnlistDateClick();
        }
        else if(event.which==37 || event.keycode==37) {
            enlistMActive();
            $("#enlistMInput").select();
        }
    });
}

function enlistYActive(){
    $("#enlistY").children().prop('disabled', false);    
    $("#enlistY").children().children().prop('disabled', false); 
    $("#enlistM").children().prop('disabled', true);    
    $("#enlistM").children().children().prop('disabled', true);  
    $("#enlistD").children().prop('disabled', true);    
    $("#enlistD").children().children().prop('disabled', true);   
    $("#year").css("color", "white");
    $("#month").css("color", "rgba(77, 77, 77, 0.918)");
    $("#day").css("color", "rgba(77, 77, 77, 0.918)");
    $("#enlistYInput").focus();
    // $("#enlistYInput").select();
}

function enlistMActive(){
    $("#enlistM").children().prop('disabled', false);    
    $("#enlistM").children().children().prop('disabled', false); 
    $("#enlistY").children().prop('disabled', true);    
    $("#enlistY").children().children().prop('disabled', true);  
    $("#enlistD").children().prop('disabled', true);    
    $("#enlistD").children().children().prop('disabled', true);      
    $("#year").css("color", "rgba(77, 77, 77, 0.918)");
    $("#month").css("color", "white");
    $("#day").css("color", "rgba(77, 77, 77, 0.918)");   
    $("#enlistMInput").focus();    
    // $("#enlistMInput").select();
}

function enlistDActive(){
    $("#enlistD").children().prop('disabled', false);    
    $("#enlistD").children().children().prop('disabled', false); 
    $("#enlistY").children().prop('disabled', true);    
    $("#enlistY").children().children().prop('disabled', true);  
    $("#enlistM").children().prop('disabled', true);    
    $("#enlistM").children().children().prop('disabled', true);     
    $("#year").css("color", "rgba(77, 77, 77, 0.918)");
    $("#month").css("color", "rgba(77, 77, 77, 0.918)"); 
    $("#day").css("color", "white");   
    $("#enlistDInput").focus();
    // $("#enlistDInput").select();
}

function onEnlistDateClick() {
    //currM ìì -1 í´ì¤ ì´ì ë, month ììì´ 0ë¶í° ë¼ê³  í¨. ( 1ìì´ 0, 2ìì´ 1...)
    currY = enlistYInput.value;
    currM = enlistMInput.value;
    currD = enlistDInput.value;
    if (!isValidDate(currY, currM - 1, currD)){
        alert("ê°ë¥í ë ì§ê° ìëëë¤. ë¤ì ì ì´ì£¼ì¸ì");
    }
    else{                
        if (currM < 10) {
            if (currM.length == 2){
                currM = currM;
            }
            else{
                currM = "0" + currM;
            }
        }
        if (currD < 10) {
            if (currD.length == 2){
                currD = currD;
            }
            else{
                currD = "0" + currD;
            }
        }
        var enlistDateStr = currY + "-" + currM + "-" + currD;
        onEnlistDateInEnd(enlistDateStr);
    }
}
function onEnlistDateInEnd(enlistDateStr) {
    localStorage.setItem("enlistDate", enlistDateStr);
    
    $("#enlistDateIn").addClass("animated fadeOutUp");
    setTimeout(function() {
        $("#enlistDateIn").hide();
        initDoneDisplay();
    }, 1000);
}

//ì¸í°ë·ìì ê¸ì´ì¨ê±°ë¼ ë³ê²½ìë§
function isValidDate(year, month, day) {
    var d = new Date(year, month, day);
    if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
        return true;
    }
    return false;
}