// for the purpose of the project, the user can only use all functions if all required fields 
// are answered

var iframeInd = 0;
var iframeArr;
var timeoutCheck;
var firstEntrance = true;
var possibleSearchEngine = ["naver", "google", "daum", "youtube", "yahoo", "baidu", "bing"];//여기에 체크할수 있는 모든 engine 다 추가 시켜줌
var settingsEnterCount = 0;

// starting point
$(document).ready(checkStorage);
$(document).ready(setBackgroundImage);

//actions from mainPage
$("#storageResetButton").click(resetStorage);
$("#leftPointer").click(clickLeft);
$("#rightPointer").click(clickRight);

//설정 바로가기 action
$("#toWeatherSettingsButton").click(function() {
    presetSettings();
    $("#settingsModal").modal("show");
    setDefaultSettingsTab(1);
});
$("#iframe").on("load",function() {
    var iframeContent = $("#iframe").contents();

    iframeContent.find(".rankSettings").click(function() {
        presetSettings();
        $("#settingsModal").modal("show");
        setDefaultSettingsTab(2);
    });
});


// 우리사이 onOff 설정 내에서 활성화 / 비활성화 시켰을 때
$("#onOffToggle").click(function() {
    if ($("#onOffToggle").hasClass("active")) {
        $("#loveInfo").find(".loveSetting").prop("disabled", true);
    }
    else {
        $("#loveInfo").find(".loveSetting").prop("disabled", false);
    }
});

//actions within settings
$("#weatherInitButton").click(function() {
    $("#toWeatherSettings").hide();
    localStorage.setItem("currLocAllowed", true);
    storageCheckLocation();
});
$("#weatherChangeLocButton").click(refreshLocation);
$("#user-name").keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
$("#lover-name").keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
$("#saveSettings").click(onSaveSettings);
$("#settingButton").click(function() {
    presetSettings();//설정 버튼 누를때 presetSettings 실행
    if (settingsEnterCount == 0) {//처음으로 설정 들어갈때만 크레딧 페이지 띄우기
        $("#settingsModal").modal("show");
        setDefaultSettingsTab(0);
    }
    settingsEnterCount++;
});

// 방향키로 iframe 왔다갔다 하기. 아직까지는 에러 모르겠음
// iframe 클릭한상태로 키보드 누르면 안 먹힘... 큰문제 아닌듯?  
$("body").keydown(function(e){
    if (isSearchClosed && ((localStorage.progressBar >= 0) && (localStorage.progressBar <= 100))) {
        if (e.keyCode == 37){
            $("iframe").removeClass("animated fadeIn");
            clickLeft();
        }
        else if (e.keyCode == 39){
            $("iframe").removeClass("animated fadeIn");
            clickRight();
        }
    }
});

/**
 * iframe 넘기기
 */
function clickRight() {
    if (localStorage.setUpComplete == "true" && $(".modal-content").is(":hidden")) {
        $("iframe").addClass("animated fadeIn");
        $("#rightPointer").mousedown(function() {
            $("iframe").removeClass("animated fadeIn");
        });
        iframeInd = ++iframeInd % iframeArr.length;
        $("iframe").attr("src", iframeArr[iframeInd]);
        localStorage.setItem("currIframe", iframeInd);
    }
}

function clickLeft() {
    if (localStorage.setUpComplete == "true" && $(".modal-content").is(":hidden")) {
        $("iframe").addClass("animated fadeIn");
        $("#leftPointer").mousedown(function() {
            $("iframe").removeClass("animated fadeIn");
        });
        iframeInd = (iframeArr.length + iframeInd - 1) % iframeArr.length;
        $("iframe").attr("src", iframeArr[iframeInd]);        
        localStorage.setItem("currIframe", iframeInd);
    }
}

function setBackgroundImage() {
    if(localStorage.length!=0) {
        var imgUrl = "url(../" + localStorage.background + ")";
        $("#defaultBG").css("background-image",imgUrl);
    }
}

// 정보를 입력받았을 때만 환영합니다 띄우고 3초 후 보여주고, 새로고침 or 새 탭 시에는 바로 띄우게 하기 위한 변수

function resetStorage() {
    localStorage.clear();
    location.reload();
}

function loadPage() {
    if (firstEntrance) {
        $("#mainInit").hide();
        $("#loadLogo").attr("src", "/img/heart.png");
        $("#mainLoad").css("display", "inline");
        firstEntrance = false;
        setTimeout(function() {
            $("#mainLoad").fadeOut(1000, function() {
                $("#mainLoad").hide();
                $("#mainInit").show();
                nameCheck();
            })
        }, 2000);
    } else {
        nameCheck();
    }
}

function checkStorage() {
    $("#timeColon").css("color", "transparent");

    if (localStorage.length == 0) {
        // 정보 입력을 받았을 때만 timeoutCheck를 1로 바꿔줘서 3초 딜레이
        timeoutCheck = 1;
        $("#defaultBG").css("background-image","url(../img/mainback4.jpg)");
        loadPage();
    } else {
        if (!localStorage.name || !localStorage.identity|| !localStorage.branch || !localStorage.enlistDate) {
            alert("최초설정이 완료되지 않았습니다.");
            //하드코딩하면 가능.
            timeoutCheck = 1;
            localStorage.clear();            
            $("#defaultBG").css("background-image","url(../img/mainback4.jpg)");
            nameCheck();
        }
        else{
            displayWidgets();
        }
    }
}

// function checkStorage() {
//     $("#timeColon").css("color", "transparent");

//     if (localStorage.length == 0) {
//         // 정보 입력을 받았을 때만 timeoutCheck를 1로 바꿔줘서 3초 딜레이
//         timeoutCheck = 1;

//         $("#defaultBG").css("background-image","url(../img/mainback2.jpg)");
//         nameCheck();
//     } else {
//         if (!localStorage.name || !localStorage.identity|| !localStorage.branch || !localStorage.enlistDate) {
//             alert("최초설정이 완료되지 않았습니다.");
//             resetStorage();
//         }
//         else{
//             displayWidgets();
//         }
//     }
// }

/**
 * welcome message after initial setup
 */
function initDoneDisplay() {
    localStorage.setItem("currLocAllowed", false);//처음에는 날씨 위치정보 허용 안 된 상태
    localStorage.setItem("setUpComplete", true);

    if (localStorage.name != "" && localStorage.identity != "" && !(localStorage.branch == "undefined") && localStorage.enlistDate != "") {
        console.log("enterinitdisplay");
        var welcomeStr = localStorage.name + "님!</br>환영합니다";
        $("#welcomeMsg").html(welcomeStr);
        $("#welcomeMsg").css("display", "inline");
        $("#welcomeMsg").fadeOut(2000, displayWidgets());
       
    } else {
        alert("모든 정보를 입력하지 않았습니다.");//TODO: make a custom alert message
        nameCheck();
    }
}

/**
 * remove welcomeMsg, display widgets and everything else
 */
function displayWidgets() {
    if(timeoutCheck==1) {
        setTimeout(displayAllFunc, 2000);
    }
    else {
        displayAllFunc();
    }
    var endDateStr = calculateEndDate();//왠지 모르겠는데 필요함;
}

/**
 * show everything on main page
 */
function displayAllFunc() {    
    
    //만약 군생활 끝났거나, 시작도 안했으면 mainItem1만 띄우기
    if (localStorage.progressBar > 100 || localStorage.progressBar < 0) {
        iframeArr = ["mainItem1.html"];
        $("#leftPointer").hide();
        $("#rightPointer").hide();
    } else if (localStorage.switchOnOff == "off" || !localStorage.switchOnOff) {
        iframeArr = ["mainItem1.html", "mainItem2.html"];
    } else if (localStorage.switchOnOff == "on") {
        iframeArr = ["mainItem1.html", "mainItem2.html", "mainItem3.html"];
    }
    // else if (localStorage.girlfriendYN == "yes" || localStorage.identity == "girlfriend") {//여친 유무에 따른 mainItem3.html을 iframArr에 포함 결정
    //     iframeArr = ["mainItem1.html", "mainItem2.html", "mainItem3.html"];
    // } else if (localStorage.girlfriendYN == "no" && localStorage.identity == "soldier") {
    //     iframeArr = ["mainItem1.html", "mainItem2.html"];
    //     $("#settingsRelTab").css("display", "none");
    // }
    // if (iframeInd != localStorage.iframeIndex) {
    //     currIframe();
    // }

    if (!localStorage.background) {
        // 기본 2번째 이미지로 html에서 정해져 있으니까 이렇게 함
        localStorage.setItem("background", "img/mainback4.jpg");
    }

    if (!localStorage.timeOpt) {
        localStorage.setItem("timeOpt", "12hr");
    }

    // 날씨 보여주기
    if (localStorage.currLocAllowed == "true") {
        getWeather();
    }
    else{
        $("#toWeatherSettings").show();
    }

    document.getElementById("iframe").contentDocument.location.reload(true);

    if(!localStorage.currIframe){
        localStorage.setItem("currIframe", 0);
    }
    iframeInd = localStorage.currIframe;
    if (iframeInd == 0){
        $("#iframe").attr("src", iframeArr[0]);
    }
    else if (iframeInd == 1){
        $("#iframe").attr("src", iframeArr[1]);
    }
    else if (iframeInd == 2){
        $("#iframe").attr("src", iframeArr[2]);
    }

    $("#mainInit").css("display","none");
    $("#mainItem").css("display","inline");
    $(".widget").css("visibility","visible");
    $("#timeColon").css("color", "white");
    // $("#backImg").attr("src", localStorage.background);
    var imgUrl = "url(" + localStorage.background + ")";
    $("#defaultBG").css("background-image", imgUrl);
    var dDayCount = "D-" + localStorage.todoDays + "일!";
    $("#dDayDisplaySm").html(dDayCount);
    resizeBrowser();

    $('#settingsModal').appendTo("body");
    $('#settingsModal').modal({
        keyboard: true,
        backdrop: true,
        focus: true,
        show: false
    });
    // presetSettings();
}

/**
 * settings
 */
function presetSettings() {//설정창 들어갔을때 local에 있는 내용으로 presetting만

    // 맨 처음에 init 끝나고 나서 서치바 안 열고 설정 들어가면 localstorage에 아무것도 없어서 이걸로 preset
    if (!localStorage.currEngine) {
        engineArray = ["naver", "google", "daum", "youtube"];
        localStorage.setItem("currEngine", "naver");
        localStorage.setItem("targetUrl", targetUrlNaver);
        localStorage.setItem("engineArray", JSON.stringify(engineArray));
    }
    
    //preset time
    if (localStorage.timeOpt == "12hr") {
        $("input[name=timeRadioSettings][value='12hr']").prop("checked",true);
    } else if (localStorage.timeOpt == "24hr") {
        $("input[name=timeRadioSettings][value='24hr']").prop("checked",true);
    }
    //preset searchEngine
    var engineArray2 = JSON.parse(localStorage.engineArray);
    for (var j = 0; j < engineArray2.length; j++) {
        if (jQuery.inArray(engineArray2[j], possibleSearchEngine) == -1) {
            $("#" + engineArray2[j] + "CB_id").prop("checked", false);
        } else {
            $("#" + engineArray2[j] + "CB_id").prop("checked", true);
        }
    }
    // preset weather
    if (localStorage.currLocAllowed == "false") {
        $("#weatherChangeLocButton").hide();
        $("#weatherInitButton").show();
    } else if (localStorage.currLocAllowed == "true") {
        $("#weatherInitButton").hide();
        $("#weatherChangeLocButton").show();
    }

    //preset name
    $("#user-name").attr("value", localStorage.name);
    //preset identity
    if (localStorage.identity == "soldier") {
        $("input[name=identityRadioSettings][value='soldier']").prop("checked",true);
    } else if (localStorage.identity == "girlfriend") {
        $("input[name=identityRadioSettings][value='girlfriend']").prop("checked",true);
        $(".fitQuestion").html("남자친구의 ");
    }
    //preset branch
    if (localStorage.branch == "army") {
        $("#user-branch option[value=army]").prop("selected", "selected");
    } else if (localStorage.branch == "navy") {
        $("#user-branch option[value=navy]").prop("selected", "selected");
    } else if (localStorage.branch == "airForce") {
        $("#user-branch option[value=airForce]").prop("selected", "selected");
    } else if (localStorage.branch == "marine") {
        $("#user-branch option[value=marine]").prop("selected", "selected");
    } else if (localStorage.branch == "socialService") {
        $("#user-branch option[value=socialService]").prop("selected", "selected");
    } else if (localStorage.branch == "police") {
        $("#user-branch option[value=police]").prop("selected", "selected");
    }

    //preset rank
    if (localStorage.rank == "이병") {
        $("#user-rank option[value=이병]").prop("selected", "selected");
    } else if (localStorage.rank == "일병") {
        $("#user-rank option[value=일병]").prop("selected", "selected");
    } else if (localStorage.rank == "상병") {
        $("#user-rank option[value=상병]").prop("selected", "selected");
    } else if (localStorage.rank == "병장") {
        $("#user-rank option[value=병장]").prop("selected", "selected");
    } else {
        $("#user-rank option[value=rankQ]").prop("selected", "selected");
    }

    //preset date
    $("#user-enlistDate").val(localStorage.enlistDate);
    //preset background
    if (localStorage.background == "img/mainback1.jpg") {
        $("input[name=bgImgRadioSettings][value='img/mainback1.jpg']").prop("checked",true);
    } else if (localStorage.background == "img/mainback2.jpg") {
        $("input[name=bgImgRadioSettings][value='img/mainback2.jpg']").prop("checked",true);
    } else if (localStorage.background == "img/mainback3.jpg") {
        $("input[name=bgImgRadioSettings][value='img/mainback3.jpg']").prop("checked",true);
    } else if (localStorage.background == "img/mainback4.jpg") {
        $("input[name=bgImgRadioSettings][value='img/mainback4.jpg']").prop("checked",true);
    } else if (localStorage.background == "img/mainback5.jpg") {
        $("input[name=bgImgRadioSettings][value='img/mainback5.jpg']").prop("checked",true);
    }
    //preset relationship info - 우리사이 세팅, 이거 은근히 길이질꺼 같은데, 나중에 다 tab마다 빼도 될듯? 
    $("#lover-name").attr("value", localStorage.loverName);
    $("#lover-birthday").val(localStorage.loverBD);//nothing yet
    $("#user-birthday").val(localStorage.userBD);//nothing yet
    $("#first-date").val(localStorage.relStartDate);
    
    // class "loveSetting"만들어서 그 하위 div (lover-name, lover-birthday, user-birthday, first-date)에다가 줌
    $("#loveInfo").find(".loveSetting").prop("disabled", true); //맨 처음엔 witchOnOff가 localStorage에 안들어가서 default로 줌
    if (localStorage.switchOnOff == "on") {
        $("#onOffToggle").addClass("active");
        $("#loveInfo").find(".loveSetting").prop("disabled", false);        
    }
    else if (localStorage.switchOnOff == "off") {
        $("#onOffToggle").removeClass("active");
        $("#loveInfo").find(".loveSetting").prop("disabled", true);
    }
    //select text field on click
    $("#user-name").click(function() {
        this.select();
    });
    $("#lover-name").click(function() {
        this.select();
    });
}

function onSaveSettings() {
    //settings-시간
    localStorage.setItem("timeOpt", $("input[name=timeRadioSettings]:checked").val());
    //settings-검색엔진 
    engineArray = [];//engineArray 비워두고 시작
    for (var i = 0; i < possibleSearchEngine.length; i++) {
        if ($("#" + possibleSearchEngine[i] + "CB_id").is(":checked")) {//체크되어 있는거만 추가
            engineArray.push(possibleSearchEngine[i]);
        }
    }
    if (engineArray.length == 0) {
        alert("최소한 1개의 검색엔진을 선택해주세요");//아무것도 체크 안 되어 있으면 검색 못하니까
    } else {
        localStorage.setItem("engineArray", JSON.stringify(engineArray));//engineArray 업데이트
        if (!($("#" + localStorage.currEngine + "CB_id").is(":checked"))) {
            localStorage.setItem("currEngine", engineArray[0]);
            //현재 engine을 없애면 그냥 남아있는거 중 처음으로, 현재 engine 안 없애고 앞의 index의 engine을 추가시키면 안 돌아가게
        }
    }

    // settingsInfo
    localStorage.setItem("name", document.getElementById("user-name").value);
    localStorage.setItem("identity", $("input[name=identityRadioSettings]:checked").val());
    localStorage.setItem("branch", $("#user-branch").val());
    localStorage.setItem("rank", $("#user-rank").val());
    localStorage.setItem("enlistDate", document.getElementById("user-enlistDate").value);

    // settingsBG
    localStorage.setItem("background", $("input[name=bgImgRadioSettings]:checked").val())

    // settingsLove
    localStorage.setItem("loverName", document.getElementById("lover-name").value);
    localStorage.setItem("loverBD", document.getElementById("lover-birthday").value);
    localStorage.setItem("userBD", document.getElementById("user-birthday").value);    
    localStorage.setItem("relStartDate", document.getElementById("first-date").value);
    if ($("#onOffToggle").hasClass("active")) {
        localStorage.setItem("switchOnOff", "on");
    } else {
        localStorage.setItem("switchOnOff", "off");
    }
    location.reload();
}

function setDefaultSettingsTab(index) {
    var settingsTabs = document.querySelectorAll("ul.nav-tabs > li > a");
    var settingsPanes = document.querySelectorAll(".tab-pane");

    var myTabs = document.querySelectorAll("ul.nav-tabs > li > a");
    var myPanes = document.querySelectorAll(".tab-pane");
    for (var i = 0; i < myTabs.length; i++) {
        myTabs[i].classList.remove("active");
        myPanes[i].classList.remove("active");
    }

    settingsTabs[index].classList.add("active");
    settingsPanes[index].classList.add("active");
}
