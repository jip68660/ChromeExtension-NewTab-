var currDate = new Date();
var currY = currDate.getFullYear();
var currM = currDate.getMonth() + 1;
var currD = currDate.getDate();
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
        alert("이름을 적어주세요");
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

/* IDENTITY */
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
        alert("신분을 선택해주세요");
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

/* GIRLFRIENDCHECK, IF IDENTITY = SOLDIER*/
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
        alert("항목을 선택해주세요");
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
        alert("이름을 적어주세요");
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
    $("#relStartDate").click(function() {
        $("#relStartDateInRight").show();
        $("#relStartDateInRight").click(onRelStartDateClick);
    });
}
function onRelStartDateClick() {
    if ($("#relStartDate").val()=="") {
        alert("날짜를 입력해주세요");
    }
    else {
        onRelStartDateInEnd();
    }
}
function onRelStartDateInEnd() {
    localStorage.setItem("relStartDate", $("#relStartDate").val());
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
        alert("소속을 선택해주세요");
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
            alert("소속을 선택해주세요");
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

// 월 선택
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

// 일 선택
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

    //default
    $("#enlistYInput").focus();
    enlistYActive();

    // year update
    $("#enlistYInput").val(currY);
    $("#enlistYInput").select();
    $("#enlistYInput").focus();
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
    $("#year").css("color", "rgba(77, 77, 77, 0.918)");
    $("#month").css("color", "white");
    $("#day").css("color", "rgba(77, 77, 77, 0.918)");   
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
    $("#year").css("color", "rgba(77, 77, 77, 0.918)");
    $("#month").css("color", "rgba(77, 77, 77, 0.918)"); 
    $("#day").css("color", "white");   
    $("#enlistDInput").focus();
    // $("#enlistDInput").select();

    $("#enlistDateInRight").show();
    $("#enlistDateInRight").click(onEnlistDateClick);
}

function onEnlistDateClick() {
    //currM 에서 -1 해준 이유는, month 시작이 0부터 라고 함. ( 1월이 0, 2월이 1...)
    currY = enlistYInput.value;
    currM = enlistMInput.value;
    currD = enlistDInput.value;
    if (!isValidDate(currY, currM - 1, currD)){
        alert("가능한 날짜가 아닙니다. 다시 적어주세요");
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