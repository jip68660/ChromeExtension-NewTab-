var currDate = new Date();
var currRelStartY = currDate.getFullYear();
var currRelStartM = currDate.getMonth() + 1;
var currRelStartD = currDate.getDate();
var currEnlistY = currDate.getFullYear();
var currEnlistM = currDate.getMonth() + 1;
var currEnlistD = currDate.getDate();
var branchSelected;
var identitySelected;
var girlfriendSelected;

/* ENTER로 다음 질문 넘어가기 */
// function onEnterPressed() {
//     urlString = document.getElementById("searchBar").value;
//     if(event.which==13 || event.keycode==13) {
//         search();
//     }
// }
$("#relStartY").mousedown(relStartYActive);
$("#relStartM").mousedown(relStartMActive);
$("#relStartD").mousedown(relStartDActive);
$("#enlistY").mousedown(enlistYActive);
$("#enlistM").mousedown(enlistMActive);
$("#enlistD").mousedown(enlistDActive);


/* NAME */
function nameCheck() {
    $("#nameIn").show();
    setTimeout(function() {
        $("#nameIn1").fadeOut(1000, function() {
            $("#nameIn2").show();
            setTimeout(function() {
                $("#nameInputField").css("visibility", "visible");
                $("#nameInputField").addClass("animated fadeInUp");
                $("#nameInput").focus();
            }, 700);
        });
    }, 1200);
    document.getElementById("nameInput").addEventListener("keyup", onNameEnter);
}
function onNameEnter() {
    $("#nameInRight").show();
    $("#nameInRight").click(onNameInEnd);
    
    if(event.which==13 || event.keycode==13) {
        onNameInEnd();
    }
}
function onNameInEnd() {
    if ($("#nameInput").val() == ""){
        bootbox.alert("이름을 적어주세요");
    }
    else{
        localStorage.setItem("name", document.getElementById("nameInput").value);
        
        $("#nameIn").addClass("animated fadeOutLeftInit");
        setTimeout(function() {
            $("#nameIn").hide();
            identityCheck();
        }, 1000);
    }
}

/**
 * IDENTITY
 * 
 * 사실상 alert가 필요없음... 사진 누르기 전까지 다음으로 넘어갈수가 없게 만들었음
 *  */
function identityCheck() {
    $("#identityIn").show();
    setTimeout(function() {
        $("#identityInput").css("visibility", "visible");
        $("#identityInput").addClass("animated fadeInUp");
    }, 700);

    $("#identitySoldierImg").mousedown(function() {
        $("#identityInRight").show();
        $(".identity").removeClass("selected");
        $("#identitySoldierImg").addClass("selected");
        identitySelected = $("#identitySoldierImg").val();
    });
    $("#identityGirlfriendImg").mousedown(function() {
        $("#identityInRight").show();
        $(".identity").removeClass("selected");
        $("#identityGirlfriendImg").addClass("selected");
        identitySelected = $("#identityGirlfriendImg").val();
    });
    $("#identityInRight").click(onIdentitySelect);
    document.getElementById("identityInput").addEventListener("keyup", onIdentitySelectKey);
}
function onIdentitySelect() {
    if (identitySelected!=undefined) {
        localStorage.setItem("identity", identitySelected);
    }
    if (!localStorage.identity || localStorage.identity == "") {
        bootbox.alert("신분을 선택해주세요");
    } else {
        onIdentityInEnd();
    }
}
function onIdentitySelectKey() {//enter 눌렀을때 설정 가능, 아무것도 안 눌린상태에서는 enter가 아예 안 먹음 -> alert 필요 없음
    if(event.which==13 || event.keycode==13) {
        onIdentityInEnd();
    }
}
function onIdentityInEnd() {//끝날때 효과 + 로컬에 저장
    localStorage.setItem("identity", identitySelected);

    $("#identityIn").addClass("animated fadeOutLeftInit");
    setTimeout(function() {
        $("#identityIn").hide();
        if (localStorage.identity == "soldier"){
            girlfriendCheck();
        } else {
            loverNameCheck();
        }
    }, 1000);
}

/**
 * GIRLFRIENDCHECK, IF IDENTITY = SOLDIER
 * 
 * 사실상 alert가 필요없음... 사진 누르기 전까지 다음으로 넘어갈수가 없게 만들었음
 *  */
function girlfriendCheck() {
    $("#girlfriendIn").show();
    setTimeout(function() {
        $("#girlfriendInput").css("visibility", "visible");
        $("#girlfriendInput").addClass("animated fadeInUp");
    }, 700);

    $("#coupleImg").mousedown(function() {
        $("#girlfriendInRight").show();
        $(".girlfriend").removeClass("selected");
        $("#coupleImg").addClass("selected");
        girlfriendSelected = $("#coupleImg").val();
    });
    $("#singleImg").mousedown(function() {
        $("#girlfriendInRight").show();
        $(".girlfriend").removeClass("selected");
        $("#singleImg").addClass("selected");
        girlfriendSelected = $("#singleImg").val();
    });
    $("#girlfriendInRight").click(onGirlfriendSelect);
    document.getElementById("girlfriendInput").addEventListener("keyup", onGirlfriendSelectKey);
}
function onGirlfriendSelect() {
    if (girlfriendSelected!=undefined) {
        localStorage.setItem("girlfriendYN", girlfriendSelected);
    }
    if (!localStorage.girlfriendYN || localStorage.girlfriendYN == "") {
        bootbox.alert("항목을 선택해주세요");
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
    localStorage.setItem("girlfriendYN", girlfriendSelected);

    $("#girlfriendIn").addClass("animated fadeOutLeftInit");
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
    $("#loverNameIn").show();
    setTimeout(function() {
        $("#loverNameInputField").css("visibility", "visible");
        $("#loverNameInputField").addClass("animated fadeInUp");
        $("#loverNameInput").focus();
    }, 700);
    
    if (localStorage.identity == "girlfriend"){
        $(".fitQuestion").html("남자친구의 ");
    }
    else{
        $(".fitQuestion").html("여자친구의 ");
    }
    document.getElementById("loverNameInput").addEventListener("keyup", onLoverNameEnter);
}
function onLoverNameEnter() {
    $("#loverNameInRight").show();
    $("#loverNameInRight").click(onLoverNameInEnd);

    if(event.which==13 || event.keycode==13) {
        onLoverNameInEnd();
    }
}
function onLoverNameInEnd() {
    if ($("#loverNameInput").val() == "") {
        bootbox.alert("이름을 적어주세요");
    } else {
        localStorage.setItem("loverName", document.getElementById("loverNameInput").value);

        $("#loverNameIn").addClass("animated fadeOutLeftInit");
        setTimeout(function() {
            $("#loverNameIn").hide();
            relStartDateCheck();
        }, 1000);
    }
}















/* GET THE START DATE OF THE RELATIONSHIP, FOR GF AND SOLDIER W/ GF */
/** TODO
 * 입대일 받는거처럼 바꿔주기
 * */










var mouseLocation, mouseDown;

// 년도 선택
function currRelStartYPlus() {
    mouseDown = true;
    $("#upPointerRelStart1").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != upPointerRelStartBtn1)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currRelStartYPlusAuto, 100);
        }, 1000);
    }

    return false;
}
function currRelStartYPlusAuto() {
    $("#upPointerRelStart1").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != upPointerRelStartBtn1)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        $("#relStartYInput").val(++currRelStartY);
        setTimeout(currRelStartYPlusAuto, 100);
    }
}
function currRelStartYMinus() {
    mouseDown = true;
    $("#downPointerRelStart1").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != downPointerRelStartBtn1)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currRelStartYMinusAuto, 100);
        }, 1000);
    }

    return false;
}
function currRelStartYMinusAuto() {
    $("#downPointerRelStart1").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != downPointerRelStartBtn1)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        $("#relStartYInput").val(--currRelStartY);
        setTimeout(currRelStartYMinusAuto, 100);
    }
}

// 월 선택
function currRelStartMPlus() {
    mouseDown = true;
    $("#upPointerRelStart2").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != upPointerRelStartBtn2)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currRelStartMPlusAuto, 100);
        }, 1000);
    }

    return false;
}
function currRelStartMPlusAuto() {
    $("#upPointerRelStart2").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != upPointerRelStartBtn2)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currRelStartM == 12) {
            currRelStartM = 0;
        }
        $("#relStartMInput").val(++currRelStartM);
        setTimeout(currRelStartMPlusAuto, 100);
    }
}
function currRelStartMMinus() {
    mouseDown = true;
    $("#downPointerRelStart2").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != downPointerRelStartBtn2)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currRelStartMMinusAuto, 100);
        }, 1000);
    }

    return false;
}
function currRelStartMMinusAuto() {
    $("#downPointerRelStart2").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != downPointerRelStartBtn2)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currRelStartM == 1) {
            currRelStartM = 13;
        }
        $("#relStartMInput").val(--currRelStartM);
        setTimeout(currRelStartMMinusAuto, 100);
    }
}

// 일 선택
function currRelStartDPlus() {
    mouseDown = true;
    $("#upPointerRelStart3").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != upPointerRelStartBtn3)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currRelStartDPlusAuto, 100);
        }, 1000);
    }

    return false;
}
function currRelStartDPlusAuto() {
    $("#upPointerRelStart3").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != upPointerRelStartBtn3)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currRelStartD == 31) {
            currRelStartD = 0;
        }
        $("#relStartDInput").val(++currRelStartD);
        setTimeout(currRelStartDPlusAuto, 100);
    }
}
function currRelStartDMinus() {
    mouseDown = true;
    $("#downPointerRelStart3").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != downPointerRelStartBtn3)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currRelStartDMinusAuto, 100);
        }, 1000);
    }

    return false;
}
function currRelStartDMinusAuto() {
    $("#downPointerRelStart3").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != downPointerRelStartBtn3)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currRelStartD == 1) {
            currRelStartD = 31;
        }
        $("#relStartDInput").val(--currRelStartD);
        setTimeout(currRelStartDMinusAuto, 100);
    }
}

/* relStartDATE */
function relStartDateCheck() {
    $("#relStartDateIn").show();
    setTimeout(function() {
        $("#relStartDateInput").css("visibility", "visible");
        $("#relStartDateInput").addClass("animated fadeInUp");
    }, 700);

    if (localStorage.identity == "girlfriend"){
        $(".fitQuestion").html("남자친구와 ");
    }
    else{
        $(".fitQuestion").html("여자친구와 ");
    }

    $("#relStartDateInRight").show();
    $("#relStartDateInRight").click(onRelStartDateClick);

    //default
    relStartYActive();

    // year update
    $("#relStartYInput").val(currRelStartY);
    $("#relStartYInput").select();
    setTimeout(function() { $('#relStartYInput').focus() }, 1000);

    $("#upPointerRelStart1").mousedown(function(){
        $("#relStartYInput").val(++currRelStartY);
        currRelStartYPlus();
    });
    $("#downPointerRelStart1").mousedown(function(){
        $("#relStartYInput").val(--currRelStartY);
        currRelStartYMinus();
    });       
    $("#relStartY").keydown(function(){
        if (event.which == 38 || event.keycode == 38) {
            $("#relStartYInput").val(++currRelStartY);
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#relStartYInput").val(--currRelStartY);
        }
        else if (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {
            currRelStartY = $("#relStartYInput").val();
            relStartMActive();
            $("#relStartMInput").select();
        }
    });

    // month update
    $("#relStartMInput").val(currRelStartM);
    $("#relStartMInput").select();
    $("#upPointerRelStart2").mousedown(function(){
        $("#relStartMInput").val(++currRelStartM);
        if (currRelStartM > 12){
            currRelStartM = 0;
            $("#relStartMInput").val(++currRelStartM);
        }
        currRelStartMPlus();
    });
    $("#downPointerRelStart2").mousedown(function(){
        $("#relStartMInput").val(--currRelStartM );
        if (currRelStartM <= 0){
            currRelStartM = 13;
            $("#relStartMInput").val(--currRelStartM);
        }
        currRelStartMMinus();
    });
    $("#relStartM").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#relStartMInput").val(++currRelStartM);
            if (currRelStartM > 12){
                currRelStartM = 0;
                $("#relStartMInput").val(++currRelStartM);
            }   
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#relStartMInput").val(--currRelStartM);
            if (currRelStartM <= 0){
                currRelStartM = 13;
                $("#relStartMInput").val(--currRelStartM);
            }
        }
        else if  (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {             
            currRelStartM = $("#relStartMInput").val();
            relStartDActive();
            $("#relStartDInput").select();
        }
        else if(event.which==37 || event.keycode==37) {
            relStartYActive();
            $("#relStartYInput").select();
        }
    });

    // date update
    $("#relStartDInput").val(currRelStartD);
    $("#relStartDInput").select();
    $("#upPointerRelStart3").mousedown(function(){
        $("#relStartDInput").val(++currRelStartD);
        if (currRelStartD > 31){
            currRelStartD = 0;
            $("#relStartDInput").val(++currRelStartD);
            // $("#relStartDInput").val("  " + ++currRelStartD);
        }
        currRelStartDPlus();
    });
    $("#downPointerRelStart3").mousedown(function(){
        $("#relStartDInput").val(--currRelStartD);
        if (currRelStartD <= 0){
            currRelStartD = 32;
            $("#relStartDInput").val(--currRelStartD);
            // $("#relStartDInput").val("  " + --currRelStartD);
        }
        currRelStartDMinus();
    });
    $("#relStartD").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#relStartDInput").val(++currRelStartD);
            if (currRelStartD > 31){
                currRelStartD = 0;
                $("#relStartDInput").val(++currRelStartD);
                // $("#relStartDInput").val("  " + ++currRelStartD);
            }
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#relStartDInput").val(--currRelStartD);
            if (currRelStartD <= 0){
                currRelStartD = 32;
                $("#relStartDInput").val(--currRelStartD);
                // $("#relStartDInput").val("  " + --currRelStartD);
            }
        }  
        else if  (event.which==13 || event.keycode==13) {                           
            currRelStartD = $("#relStartDInput").val()           
            onRelStartDateClick();
        }
        else if(event.which==37 || event.keycode==37) {
            relStartMActive();
            $("#relStartMInput").select();
        }
    });
}

function relStartYActive(){
    $("#relStartY").children().prop('disabled', false);    
    $("#relStartY").children().children().prop('disabled', false); 
    $("#relStartM").children().prop('disabled', true);    
    $("#relStartM").children().children().prop('disabled', true);  
    $("#relStartD").children().prop('disabled', true);    
    $("#relStartD").children().children().prop('disabled', true);   
    $("#yearRelStart").css("color", "white");
    $("#monthRelStart").css("color", "rgba(77, 77, 77, 0.918)");
    $("#dayRelStart").css("color", "rgba(77, 77, 77, 0.918)");
    $("#relStartYInput").focus();
    // $("#relStartYInput").select();

    $("#relStartDateInRight").show();
    $("#relStartDateInRight").click(onRelStartDateClick);
}

function relStartMActive(){
    $("#relStartM").children().prop('disabled', false);    
    $("#relStartM").children().children().prop('disabled', false); 
    $("#relStartY").children().prop('disabled', true);    
    $("#relStartY").children().children().prop('disabled', true);  
    $("#relStartD").children().prop('disabled', true);    
    $("#relStartD").children().children().prop('disabled', true);      
    $("#yearRelStart").css("color", "rgba(77, 77, 77, 0.918)");
    $("#monthRelStart").css("color", "white");
    $("#dayRelStart").css("color", "rgba(77, 77, 77, 0.918)");   
    $("#relStartMInput").focus();    
    // $("#relStartMInput").select();

    $("#relStartDateInRight").show();
    $("#relStartDateInRight").click(onRelStartDateClick);
}

function relStartDActive(){
    $("#relStartD").children().prop('disabled', false);    
    $("#relStartD").children().children().prop('disabled', false); 
    $("#relStartY").children().prop('disabled', true);    
    $("#relStartY").children().children().prop('disabled', true);  
    $("#relStartM").children().prop('disabled', true);    
    $("#relStartM").children().children().prop('disabled', true);     
    $("#yearRelStart").css("color", "rgba(77, 77, 77, 0.918)");
    $("#monthRelStart").css("color", "rgba(77, 77, 77, 0.918)"); 
    $("#dayRelStart").css("color", "white");   
    $("#relStartDInput").focus();
    // $("#relStartDInput").select();

    $("#relStartDateInRight").show();
    $("#relStartDateInRight").click(onRelStartDateClick);
}

function onRelStartDateClick() {
    //currRelStartM 에서 -1 해준 이유는, month 시작이 0부터 라고 함. ( 1월이 0, 2월이 1...)
    currRelStartY = relStartYInput.value;
    currRelStartM = relStartMInput.value;
    currRelStartD = relStartDInput.value;
    if (!isValidDate(currRelStartY, currRelStartM - 1, currRelStartD)){
        bootbox.alert("가능한 날짜가 아닙니다. 다시 적어주세요");
    }
    else{                
        if (currRelStartM < 10) {
            if (currRelStartM.length == 2){
                currRelStartM = currRelStartM;
            }
            else{
                currRelStartM = "0" + currRelStartM;
            }
        }
        if (currRelStartD < 10) {
            if (currRelStartD.length == 2){
                currRelStartD = currRelStartD;
            }
            else{
                currRelStartD = "0" + currRelStartD;
            }
        }
        var relStartDateStr = currRelStartY + "-" + currRelStartM + "-" + currRelStartD;
        onRelStartDateInEnd(relStartDateStr);
    }
}
function onRelStartDateInEnd(relStartDateStr) {
    localStorage.setItem("relStartDate", relStartDateStr);
    localStorage.setItem("switchOnOff", "on");//연인일 경우 우리사이 활성화
    
    $("#relStartDateIn").addClass("animated fadeOutLeftInit");
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
        $(".fitQuestion").html("남자친구의 ");
    }
    else{
        $(".fitQuestion").html("");
    }
    $("#army").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#army").addClass("selected");
        branchSelected = $("#army").attr("id");
    });
    $("#navy").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#navy").addClass("selected");
        branchSelected = $("#navy").attr("id");
    });
    $("#airForce").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#airForce").addClass("selected");
        branchSelected = $("#airForce").attr("id");
    });
    $("#marine").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#marine").addClass("selected");
        branchSelected = $("#marine").attr("id");
    });
    $("#socialService").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#socialService").addClass("selected");
        branchSelected = $("#socialService").attr("id");
    });
    $("#police").mousedown(function() {
        $("#branchInRight").show();
        $(".branch").removeClass("selected");
        $("#police").addClass("selected");
        branchSelected = $("#police").attr("id");
    });

    $("#branchInRight").click(onBranchSelect);
    document.getElementById("branchInput").addEventListener("keyup", onBranchSelectKey);//이게 안 먹음...
}
function onBranchSelect() {
    // localStorage.setItem("branch", $("input[name=branchRadio]:checked").val());
    // document.getElementById("branchIn").style.display = "none";
    // enlistDateCheck();
    if (branchSelected != undefined) {
        localStorage.setItem("branch", branchSelected);
    }
    if (!localStorage.branch || localStorage.branch == "") {
        bootbox.alert("소속을 선택해주세요");
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
            bootbox.alert("소속을 선택해주세요");
        } else {
            onBranchInEnd();
        }
    }
}
function onBranchInEnd() {
    localStorage.setItem("branch", branchSelected);
    
    $("#branchIn").addClass("animated fadeOutLeftInit");
    setTimeout(function() {
        $("#branchIn").hide();
        enlistDateCheck();
    }, 1000);
}

var mouseLocation, mouseDown;

// 년도 선택
function currEnlistYPlus() {
    mouseDown = true;
    $("#upPointerEnlist1").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != upPointerEnlistBtn1)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currEnlistYPlusAuto, 100);
        }, 1000);
    }

    return false;
}
function currEnlistYPlusAuto() {
    $("#upPointerEnlist1").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != upPointerEnlistBtn1)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        $("#enlistYInput").val(++currEnlistY);
        setTimeout(currEnlistYPlusAuto, 100);
    }
}
function currEnlistYMinus() {
    mouseDown = true;
    $("#downPointerEnlist1").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != downPointerEnlistBtn1)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currEnlistYMinusAuto, 100);
        }, 1000);
    }

    return false;
}
function currEnlistYMinusAuto() {
    $("#downPointerEnlist1").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != downPointerEnlistBtn1)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        $("#enlistYInput").val(--currEnlistY);
        setTimeout(currEnlistYMinusAuto, 100);
    }
}

// 월 선택
function currEnlistMPlus() {
    mouseDown = true;
    $("#upPointerEnlist2").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != upPointerEnlistBtn2)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currEnlistMPlusAuto, 100);
        }, 1000);
    }

    return false;
}
function currEnlistMPlusAuto() {
    $("#upPointerEnlist2").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != upPointerEnlistBtn2)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currEnlistM == 12) {
            currEnlistM = 0;
        }
        $("#enlistMInput").val(++currEnlistM);
        setTimeout(currEnlistMPlusAuto, 100);
    }
}
function currEnlistMMinus() {
    mouseDown = true;
    $("#downPointerEnlist2").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != downPointerEnlistBtn2)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currEnlistMMinusAuto, 100);
        }, 1000);
    }

    return false;
}
function currEnlistMMinusAuto() {
    $("#downPointerEnlist2").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != downPointerEnlistBtn2)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currEnlistM == 1) {
            currEnlistM = 13;
        }
        $("#enlistMInput").val(--currEnlistM);
        setTimeout(currEnlistMMinusAuto, 100);
    }
}

// 일 선택
function currEnlistDPlus() {
    mouseDown = true;
    $("#upPointerEnlist3").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != upPointerEnlistBtn3)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currEnlistDPlusAuto, 100);
        }, 1000);
    }

    return false;
}
function currEnlistDPlusAuto() {
    $("#upPointerEnlist3").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != upPointerEnlistBtn3)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currEnlistD == 31) {
            currEnlistD = 0;
        }
        $("#enlistDInput").val(++currEnlistD);
        setTimeout(currEnlistDPlusAuto, 100);
    }
}
function currEnlistDMinus() {
    mouseDown = true;
    $("#downPointerEnlist3").mouseup(function () {
        mouseDown = false;
        return false;
    });
    if (mouseDown) {
        mouseLocation = true;
        $(document).mousemove(function (event) {
            if (event.target != downPointerEnlistBtn3)
                mouseLocation = false;
        });
        setTimeout(function () {
            setTimeout(currEnlistDMinusAuto, 100);
        }, 1000);
    }

    return false;
}
function currEnlistDMinusAuto() {
    $("#downPointerEnlist3").mouseup(function () {
        mouseDown = false;
    });
    $(document).mousemove(function (event) {
        if (event.target != downPointerEnlistBtn3)
            mouseLocation = false;
    });
    if (mouseLocation && mouseDown) {
        if (currEnlistD == 1) {
            currEnlistD = 31;
        }
        $("#enlistDInput").val(--currEnlistD);
        setTimeout(currEnlistDMinusAuto, 100);
    }
}

/* ENLISTDATE */
function enlistDateCheck() {
    $("#enlistDateIn").show();
    setTimeout(function() {
        $("#enlistDateInput").css("visibility", "visible");
        $("#enlistDateInput").addClass("animated fadeInUp");
    }, 700);

    //default
    enlistYActive();

    // year update
    $("#enlistYInput").val(currEnlistY);
    $("#enlistYInput").select();
    setTimeout(function() { $('#enlistYInput').focus() }, 1000);

    $("#upPointerEnlist1").mousedown(function(){
        $("#enlistYInput").val(++currEnlistY);
        currEnlistYPlus();
    });
    $("#downPointerEnlist1").mousedown(function(){
        $("#enlistYInput").val(--currEnlistY);
        currEnlistYMinus();
    });       
    $("#enlistY").keydown(function(){
        if (event.which == 38 || event.keycode == 38) {
            $("#enlistYInput").val(++currEnlistY);
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#enlistYInput").val(--currEnlistY);
        }
        else if (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {
            currEnlistY = $("#enlistYInput").val();
            enlistMActive();
            $("#enlistMInput").select();
        }
    });

    // month update
    $("#enlistMInput").val(currEnlistM);
    $("#enlistMInput").select();
    $("#upPointerEnlist2").mousedown(function(){
        $("#enlistMInput").val(++currEnlistM);
        if (currEnlistM > 12){
            currEnlistM = 0;
            $("#enlistMInput").val(++currEnlistM);
        }
        currEnlistMPlus();
    });
    $("#downPointerEnlist2").mousedown(function(){
        $("#enlistMInput").val(--currEnlistM );
        if (currEnlistM <= 0){
            currEnlistM = 13;
            $("#enlistMInput").val(--currEnlistM);
        }
        currEnlistMMinus();
    });
    $("#enlistM").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#enlistMInput").val(++currEnlistM);
            if (currEnlistM > 12){
                currEnlistM = 0;
                $("#enlistMInput").val(++currEnlistM);
            }   
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#enlistMInput").val(--currEnlistM);
            if (currEnlistM <= 0){
                currEnlistM = 13;
                $("#enlistMInput").val(--currEnlistM);
            }
        }
        else if  (event.which==13 || event.keycode==13 || event.which==39 || event.keycode==39) {             
            currEnlistM = $("#enlistMInput").val();
            enlistDActive();
            $("#enlistDInput").select();
        }
        else if(event.which==37 || event.keycode==37) {
            enlistYActive();
            $("#enlistYInput").select();
        }
    });

    // date update
    $("#enlistDInput").val(currEnlistD);
    $("#enlistDInput").select();
    $("#upPointerEnlist3").mousedown(function(){
        $("#enlistDInput").val(++currEnlistD);
        if (currEnlistD > 31){
            currEnlistD = 0;
            $("#enlistDInput").val(++currEnlistD);
            // $("#enlistDInput").val("  " + ++currEnlistD);
        }
        currEnlistDPlus();
    });
    $("#downPointerEnlist3").mousedown(function(){
        $("#enlistDInput").val(--currEnlistD);
        if (currEnlistD <= 0){
            currEnlistD = 32;
            $("#enlistDInput").val(--currEnlistD);
            // $("#enlistDInput").val("  " + --currEnlistD);
        }
        currEnlistDMinus();
    });
    $("#enlistD").keydown(function(){
        if (event.which == 38 || event.keycode == 38){
            $("#enlistDInput").val(++currEnlistD);
            if (currEnlistD > 31){
                currEnlistD = 0;
                $("#enlistDInput").val(++currEnlistD);
                // $("#enlistDInput").val("  " + ++currEnlistD);
            }
        }
        else if (event.which == 40 || event.keycode == 40){            
            $("#enlistDInput").val(--currEnlistD);
            if (currEnlistD <= 0){
                currEnlistD = 32;
                $("#enlistDInput").val(--currEnlistD);
                // $("#enlistDInput").val("  " + --currEnlistD);
            }
        }  
        else if  (event.which==13 || event.keycode==13) {                           
            currEnlistD = $("#enlistDInput").val()           
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
    $("#yearEnlist").css("color", "white");
    $("#monthEnlist").css("color", "rgba(77, 77, 77, 0.918)");
    $("#dayEnlist").css("color", "rgba(77, 77, 77, 0.918)");
    $("#enlistYInput").focus();
    // $("#enlistYInput").select();

    $("#enlistDateInRight").show();
    $("#enlistDateInRight").click(onEnlistDateClick);
}

function enlistMActive(){
    $("#enlistM").children().prop('disabled', false);    
    $("#enlistM").children().children().prop('disabled', false); 
    $("#enlistY").children().prop('disabled', true);    
    $("#enlistY").children().children().prop('disabled', true);  
    $("#enlistD").children().prop('disabled', true);    
    $("#enlistD").children().children().prop('disabled', true);      
    $("#yearEnlist").css("color", "rgba(77, 77, 77, 0.918)");
    $("#monthEnlist").css("color", "white");
    $("#dayEnlist").css("color", "rgba(77, 77, 77, 0.918)");   
    $("#enlistMInput").focus();    
    // $("#enlistMInput").select();

    $("#enlistDateInRight").show();
    $("#enlistDateInRight").click(onEnlistDateClick);
}

function enlistDActive(){
    $("#enlistD").children().prop('disabled', false);    
    $("#enlistD").children().children().prop('disabled', false); 
    $("#enlistY").children().prop('disabled', true);    
    $("#enlistY").children().children().prop('disabled', true);  
    $("#enlistM").children().prop('disabled', true);    
    $("#enlistM").children().children().prop('disabled', true);     
    $("#yearEnlist").css("color", "rgba(77, 77, 77, 0.918)");
    $("#monthEnlist").css("color", "rgba(77, 77, 77, 0.918)"); 
    $("#dayEnlist").css("color", "white");   
    $("#enlistDInput").focus();
    // $("#enlistDInput").select();

    $("#enlistDateInRight").show();
    $("#enlistDateInRight").click(onEnlistDateClick);
}

function onEnlistDateClick() {
    //currEnlistM 에서 -1 해준 이유는, month 시작이 0부터 라고 함. ( 1월이 0, 2월이 1...)
    currEnlistY = enlistYInput.value;
    currEnlistM = enlistMInput.value;
    currEnlistD = enlistDInput.value;
    if (!isValidDate(currEnlistY, currEnlistM - 1, currEnlistD)){
        bootbox.alert("가능한 날짜가 아닙니다. 다시 적어주세요");
    }
    else{                
        if (currEnlistM < 10) {
            if (currEnlistM.length == 2){
                currEnlistM = currEnlistM;
            }
            else{
                currEnlistM = "0" + currEnlistM;
            }
        }
        if (currEnlistD < 10) {
            if (currEnlistD.length == 2){
                currEnlistD = currEnlistD;
            }
            else{
                currEnlistD = "0" + currEnlistD;
            }
        }
        var enlistDateStr = currEnlistY + "-" + currEnlistM + "-" + currEnlistD;
        onEnlistDateInEnd(enlistDateStr);
    }
}
function onEnlistDateInEnd(enlistDateStr) {
    localStorage.setItem("enlistDate", enlistDateStr);
    
    $("#enlistDateIn").addClass("animated fadeOutLeftInit");
    setTimeout(function() {
        $("#enlistDateIn").hide();
        initDoneDisplay();
    }, 1000);
}

//인터넷에서 긁어온거라 변경요망
function isValidDate(year, month, day) {
    var d = new Date(year, month, day);
    if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
        return true;
    }
    return false;
}