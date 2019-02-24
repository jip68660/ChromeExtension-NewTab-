// for the purpose of the project, the user can only use all functions if all required fields 
// are answered

var iframeInd = 0;
var iframeArr;
var timeoutCheck;
var firstEntrance = true;
var possibleSearchEngine = ["naver", "google", "daum", "youtube", "yahoo", "baidu", "bing"];//ì¬ê¸°ì ì²´í¬í ì ìë ëª¨ë  engine ë¤ ì¶ê° ìì¼ì¤
var settingsEnterCount = 0;

// starting point
$(document).ready(checkStorage);
$(document).ready(setBackgroundImage);

//actions from mainPage
$("#storageResetButton").click(resetStorage);
$("#leftPointer").click(clickLeft);
$("#rightPointer").click(clickRight);

//ì¤ì  ë°ë¡ê°ê¸° action
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


// ì°ë¦¬ì¬ì´ onOff ì¤ì  ë´ìì íì±í / ë¹íì±í ìì¼°ì ë
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
    presetSettings();//ì¤ì  ë²í¼ ëë¥¼ë presetSettings ì¤í
    if (settingsEnterCount == 0) {//ì²ìì¼ë¡ ì¤ì  ë¤ì´ê°ëë§ í¬ë ë§ íì´ì§ ëì°ê¸°
        $("#settingsModal").modal("show");
        setDefaultSettingsTab(0);
    }
    settingsEnterCount++;
});

// ë°©í¥í¤ë¡ iframe ìë¤ê°ë¤ íê¸°. ìì§ê¹ì§ë ìë¬ ëª¨ë¥´ê² ì
// iframe í´ë¦­íìíë¡ í¤ë³´ë ëë¥´ë©´ ì ë¨¹í... í°ë¬¸ì  ìëë¯?  
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
 * iframe ëê¸°ê¸°
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

// ì ë³´ë¥¼ ìë ¥ë°ìì ëë§ íìí©ëë¤ ëì°ê³  3ì´ í ë³´ì¬ì£¼ê³ , ìë¡ê³ ì¹¨ or ì í­ ììë ë°ë¡ ëì°ê² íê¸° ìí ë³ì

function resetStorage() {
    localStorage.clear();
    location.reload();
}

function loadPage() {
    
    if (firstEntrance) {
        $("#mainInit").hide();
        // var loadStr = "ë¡ë©ì¤ìëë¤";
        // $("#loadMsg").html(loadStr);
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
        // ì ë³´ ìë ¥ì ë°ìì ëë§ timeoutCheckë¥¼ 1ë¡ ë°ê¿ì¤ì 3ì´ ëë ì´
        timeoutCheck = 1;
        $("#defaultBG").css("background-image","url(../img/mainback4.jpg)");
        loadPage();
    } else {
        if (!localStorage.name || !localStorage.identity|| !localStorage.branch || !localStorage.enlistDate) {
            alert("ìµì´ì¤ì ì´ ìë£ëì§ ìììµëë¤.");
            //íëì½ë©íë©´ ê°ë¥.
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
//         // ì ë³´ ìë ¥ì ë°ìì ëë§ timeoutCheckë¥¼ 1ë¡ ë°ê¿ì¤ì 3ì´ ëë ì´
//         timeoutCheck = 1;

//         $("#defaultBG").css("background-image","url(../img/mainback2.jpg)");
//         nameCheck();
//     } else {
//         if (!localStorage.name || !localStorage.identity|| !localStorage.branch || !localStorage.enlistDate) {
//             alert("ìµì´ì¤ì ì´ ìë£ëì§ ìììµëë¤.");
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
    localStorage.setItem("currLocAllowed", false);//ì²ììë ë ì¨ ìì¹ì ë³´ íì© ì ë ìí
    localStorage.setItem("setUpComplete", true);

    if (localStorage.name != "" && localStorage.identity != "" && !(localStorage.branch == "undefined") && localStorage.enlistDate != "") {

        var welcomeStr = "íìí©ëë¤";
        $("#welcomeMsg").html(welcomeStr);
        $("#welcomeMsg").css("display", "inline");
        $("#welcomeMsg").fadeOut(2000, displayWidgets());
       
    } else {
        alert("ëª¨ë  ì ë³´ë¥¼ ìë ¥íì§ ìììµëë¤.");//TODO: make a custom alert message
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
    var endDateStr = calculateEndDate();//ì ì§ ëª¨ë¥´ê² ëë° íìí¨;
}

/**
 * show everything on main page
 */
function displayAllFunc() {    
    
    //ë§ì½ êµ°ìí ëë¬ê±°ë, ììë ìíì¼ë©´ mainItem1ë§ ëì°ê¸°
    if (localStorage.progressBar > 100 || localStorage.progressBar < 0) {
        iframeArr = ["mainItem1.html"];
        $("#leftPointer").hide();
        $("#rightPointer").hide();
    } else if (localStorage.switchOnOff == "off" || !localStorage.switchOnOff) {
        iframeArr = ["mainItem1.html", "mainItem2.html"];
    } else if (localStorage.switchOnOff == "on") {
        iframeArr = ["mainItem1.html", "mainItem2.html", "mainItem3.html"];
    }
    // else if (localStorage.girlfriendYN == "yes" || localStorage.identity == "girlfriend") {//ì¬ì¹ ì ë¬´ì ë°ë¥¸ mainItem3.htmlì iframArrì í¬í¨ ê²°ì 
    //     iframeArr = ["mainItem1.html", "mainItem2.html", "mainItem3.html"];
    // } else if (localStorage.girlfriendYN == "no" && localStorage.identity == "soldier") {
    //     iframeArr = ["mainItem1.html", "mainItem2.html"];
    //     $("#settingsRelTab").css("display", "none");
    // }
    // if (iframeInd != localStorage.iframeIndex) {
    //     currIframe();
    // }

    if (!localStorage.background) {
        // ê¸°ë³¸ 2ë²ì§¸ ì´ë¯¸ì§ë¡ htmlìì ì í´ì ¸ ìì¼ëê¹ ì´ë ê² í¨
        localStorage.setItem("background", "img/mainback4.jpg");
    }

    if (!localStorage.timeOpt) {
        localStorage.setItem("timeOpt", "12hr");
    }

    // ë ì¨ ë³´ì¬ì£¼ê¸°
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
    var dDayCount = "D-" + localStorage.todoDays + "ì¼!";
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
function presetSettings() {//ì¤ì ì°½ ë¤ì´ê°ìë localì ìë ë´ì©ì¼ë¡ presettingë§

    // ë§¨ ì²ìì init ëëê³  ëì ìì¹ë° ì ì´ê³  ì¤ì  ë¤ì´ê°ë©´ localstorageì ìë¬´ê²ë ìì´ì ì´ê±¸ë¡ preset
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
        $(".fitQuestion").html("ë¨ìì¹êµ¬ì ");
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
    if (localStorage.rank == "ì´ë³") {
        $("#user-rank option[value=ì´ë³]").prop("selected", "selected");
    } else if (localStorage.rank == "ì¼ë³") {
        $("#user-rank option[value=ì¼ë³]").prop("selected", "selected");
    } else if (localStorage.rank == "ìë³") {
        $("#user-rank option[value=ìë³]").prop("selected", "selected");
    } else if (localStorage.rank == "ë³ì¥") {
        $("#user-rank option[value=ë³ì¥]").prop("selected", "selected");
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
    //preset relationship info - ì°ë¦¬ì¬ì´ ì¸í, ì´ê±° ìê·¼í ê¸¸ì´ì§êº¼ ê°ìë°, ëì¤ì ë¤ tabë§ë¤ ë¹¼ë ë ë¯? 
    $("#lover-name").attr("value", localStorage.loverName);
    $("#lover-birthday").val(localStorage.loverBD);//nothing yet
    $("#user-birthday").val(localStorage.userBD);//nothing yet
    $("#first-date").val(localStorage.relStartDate);
    
    // class "loveSetting"ë§ë¤ì´ì ê·¸ íì div (lover-name, lover-birthday, user-birthday, first-date)ìë¤ê° ì¤
    $("#loveInfo").find(".loveSetting").prop("disabled", true); //ë§¨ ì²ìì witchOnOffê° localStorageì ìë¤ì´ê°ì defaultë¡ ì¤
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
    //settings-ìê°
    localStorage.setItem("timeOpt", $("input[name=timeRadioSettings]:checked").val());
    //settings-ê²ììì§ 
    engineArray = [];//engineArray ë¹ìëê³  ìì
    for (var i = 0; i < possibleSearchEngine.length; i++) {
        if ($("#" + possibleSearchEngine[i] + "CB_id").is(":checked")) {//ì²´í¬ëì´ ìëê±°ë§ ì¶ê°
            engineArray.push(possibleSearchEngine[i]);
        }
    }
    if (engineArray.length == 0) {
        alert("ìµìí 1ê°ì ê²ììì§ì ì íí´ì£¼ì¸ì");//ìë¬´ê²ë ì²´í¬ ì ëì´ ìì¼ë©´ ê²ì ëª»íëê¹
    } else {
        localStorage.setItem("engineArray", JSON.stringify(engineArray));//engineArray ìë°ì´í¸
        if (!($("#" + localStorage.currEngine + "CB_id").is(":checked"))) {
            localStorage.setItem("currEngine", engineArray[0]);
            //íì¬ engineì ìì ë©´ ê·¸ë¥ ë¨ììëê±° ì¤ ì²ìì¼ë¡, íì¬ engine ì ìì ê³  ìì indexì engineì ì¶ê°ìí¤ë©´ ì ëìê°ê²
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
