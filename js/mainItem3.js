// $('#dateBox').click(toggle);
// $("#infoBox").click(toggle2);
$("#relationshipInfo").click(function() {
    displayDates();

    $("#relationshipInfo").hide();
    $("#relationshipInfoBack").show();
});
$("#relationshipInfoBack").click(function() {
    $("#relationshipInfoBack").hide();
    $("#relationshipInfo").show();
});

$(".imgSetting").click(function() {
    $("#picModal").modal("hide");
});

$(".coupleImg").click(function() {
    for (var i = 1; i <= 3; i++) {
        if ($("#withGF" + i).attr("src") != "img/imgIcon.png") {
            console.log("ennasdfadsf");
            $("#check" + i).css("visibility", "visible");
        }
    }
})
$("#imgUpload1").change(function(e) {
    currFileNum = 1;
    fileUpload(e);
});
$("#imgUpload2").change(function(e) {
    currFileNum = 2;
    fileUpload(e);
});
$("#imgUpload3").change(function(e) {
    currFileNum = 3;
    fileUpload(e);
});
$("#x1").click(function() {
    $("#check1").css("visibility", "hidden");
    deleteImg(1);
});
$("#x2").click(function() {
    $("#check2").css("visibility", "hidden");
    deleteImg(2);
});
$("#x3").click(function() {
    $("#check3").css("visibility", "hidden");
    deleteImg(3);
});
$("#imgSave").click(saveToDb);
$("#imgRevert").click(revertImg);

$("#anniversaryImg").click(celebrate);
// var anniversaryDate = ["img/heart.png", "img/100.png", "img/200.png", "img/300.png", "img/1year.png", "img/400.png", "img/500.png", "img/600.png", "img/700.png", "img/2year.png", "img/800.png", "img/900.png", "img/1000.png", "img/3year.png", "img/4year.png", "img/BD_lover.png", "img/BD_user.png"];

var loverBD = new Date(localStorage.loverBD);
var userBD = new Date(localStorage.userBD);
var today = new Date();
var timeZoneOffSet= new Date().getTimezoneOffset() * 60000;
var todayOff = new Date(today - timeZoneOffSet);
var todayISO = todayOff.toISOString().slice(0,10).replace(/-/g, "");
var relDate = new Date(localStorage.relStartDate);
var year, month, day;
var lastAnniversaryDate;
var nextAnniversaryDate;

// Database
let db;
let dbVersion = 1;
let dbReady = false;
var currFileNum;
var firstfile;
var secondfile;
var thirdfile;

$(document).ready(function() {

    //모든 이미지 오른쪽 마우스 클릭 금지
    $("img").on("contextmenu",function(){
        return false;
    }); 

    $("body").css({
        "text-align": "center"
    });
    $("#anniversayDate").hide();

    checking();
    checkAnniversary();

});

function checking() {
    if (!localStorage.loverName || !localStorage.relStartDate){//활성화는 됐는데 init에서 이거 두개 밖에 안 받아서... 이거라도 있으면 display
        $("#instruction").show();  
        $("#pageContent").hide(); 
    } else {
        $("#instruction").hide(); 
        $("#pageContent").show(); 

        $("#userName").html(localStorage.name);
        $("#loverName").html(localStorage.loverName);
        var daysInRelVal = Math.floor((new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()) - new Date(relDate.getFullYear(), relDate.getMonth() - 1, relDate.getDate())) / (1000 * 3600 * 24)) + 1;
        $("#daysInRel").html("D+" + daysInRelVal);
        $("#infoBox").hide();

        //open database
        initDb();

        if (localStorage.background == "img/mainback1.jpg") {
            $(".font-color").css("color", "#303030");
        }
    }    
}

function checkAnniversary() {    
    var anniversaryDateArray = [];
    //100일, 200일, 300일, .... 추가
    for (var i = 1; i<11; i++){
        var relCal = relDate;
        relCal.setDate(relDate.getDate() + i*100 - 1);
        //array사용하고 나서 그 해당 기념일의 이미지를 어떻게 받을까 고민하다 [기념일날, 기념일이미지이름] 이런식으로 설정함
        var relCal = [relCal, i*100];
        anniversaryDateArray.push(relCal);
        relDate = new Date(localStorage.relStartDate);
    }
    //1주년,2주년...4주년까지 추가 -> 4주년 이후로는 그냥 안해도 될꺼같음, 아니면 그 위로는 글귀띄워도 재미있을듯. ex)"결혼하셔야죠 이제"
    for (var i = 1; i<5; i++){
        relCal365 = new Date(relDate.getFullYear() + i, relDate.getMonth(), relDate.getDate());
        relCal365 = [relCal365, i + "year"];
        anniversaryDateArray.push(relCal365);
    }    

    //유저가 생일을 다 입력했을떄만 나옴, 아니면 없음
    if (localStorage.loverBD && localStorage.userBD){
        var lastYearLoverBD = new Date(today.getFullYear() - 1, loverBD.getMonth(), loverBD.getDate());
        var thisYearLoverBD = new Date(today.getFullYear(), loverBD.getMonth(), loverBD.getDate());
        var nextYearLoverBD = new Date(today.getFullYear() + 1, loverBD.getMonth(), loverBD.getDate());
        var lastYearUserBD = new Date(today.getFullYear() - 1, userBD.getMonth(), userBD.getDate());
        var thisYearUserBD = new Date(today.getFullYear(), userBD.getMonth(), userBD.getDate());
        var nextYearUserBD = new Date(today.getFullYear() + 1, userBD.getMonth(), userBD.getDate());
        lastYearLoverBD = [lastYearLoverBD, "BD"];
        thisYearLoverBD = [thisYearLoverBD, "BD"];
        nextYearLoverBD = [nextYearLoverBD, "BD"];
        lastYearUserBD = [lastYearUserBD, "BD"];
        thisYearUserBD = [thisYearUserBD, "BD"];
        nextYearUserBD = [nextYearUserBD, "BD"];

        //사귄날이 2019년도인데 2018년도 생일 기념일은 말이 안된다, 그거 계산;
        if (relDate > thisYearLoverBD[0] || relDate > thisYearUserBD[0]){
            //기본적으로 다음년도 생일 추가
            anniversaryDateArray.push(nextYearLoverBD);
            anniversaryDateArray.push(nextYearUserBD);
            //이번년도 생일이 사귄날짜 이후면 추가
            if(relDate < thisYearLoverBD[0]){
                anniversaryDateArray.push(thisYearLoverBD);
            }            
            if (relDate < thisYearUserBD[0]){
                anniversaryDateArray.push(thisYearUserBD);
            }
        }
        else{ 
            anniversaryDateArray.push(lastYearLoverBD);
            anniversaryDateArray.push(thisYearLoverBD);
            anniversaryDateArray.push(nextYearLoverBD);
            anniversaryDateArray.push(lastYearUserBD);
            anniversaryDateArray.push(thisYearUserBD);
            anniversaryDateArray.push(nextYearUserBD);
        }
    }
    //기념일날 전부 string으로 변환
    for (var i = 0; i < anniversaryDateArray.length; i++){
        var dateFormat = anniversaryDateArray[i][0];
        if(isValidDate(dateFormat.getFullYear(), dateFormat.getMonth(), dateFormat.getDate())){    
            //toISOString()하면 무조건 UTC기준으로 간다고 해서 local timezoneOffSet 확인해줘야함
            var convertUTCtoKST = new Date(dateFormat - timeZoneOffSet);
            anniversaryDateArray[i][0] = convertUTCtoKST.toISOString().slice(0,10).replace(/-/g, "");
        }
    }
    //기념일날 기준으로 sort
    anniversaryDateArray.sort();
    console.log(anniversaryDateArray);

    //오늘기준으로 기념일인지, 전 기념일은 뭔지, 다음 기념일은 뭔지 계산 및 보여주기
    for (var i = 0; i < anniversaryDateArray.length; i++) {
        var dateCheck = anniversaryDateArray[i];
        
        //오늘이 기념일
        if (dateCheck[0] == todayISO){
            // $("#middleBox").hide();
            $("#anniversaryDate").show();
            $("#anniversaryImg").attr("src", "/img/" + dateCheck[1] + ".png");
            break;
        }
        //전기념일 계산
        else if (dateCheck[0] < todayISO){
            lastAnniversaryDate = dateCheck[1];            
        }
        //다음기념일 계산하고나면, 마지막 전기념일이 전기념일
        else if (dateCheck[0] > todayISO){
            nextAnniversaryDate = dateCheck[1];    
            if (lastAnniversaryDate == undefined){
                lastAnniversaryDate = "heart";
            }  
            $("#lastAnniversaryImg").attr("src", "/img/" + lastAnniversaryDate + ".png");
            $("#nextAnniversaryImg").attr("src", "/img/" + nextAnniversaryDate + ".png");
            break;
        }
    }
}

// function changeToString(dateFormat) {
//     dateFormat = dateFormat.toISOString().slice(0,10).replace(/-/g,"");
//     return dateFormat;
// }

function isValidDate(year, month, day) {
    var d = new Date(year, month, day);
    if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
        return true;
    }
    return false;
}

function displayDates() {
    var waitDays = Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - new Date(relDate.getFullYear(), relDate.getMonth(), relDate.getDate())) / (1000 * 3600 * 24)) + 1;
    var doneDays = localStorage.wholeDays - localStorage.todoDays;
    if (waitDays > doneDays){
        $("#waitDaysCount").html("D+" + doneDays);
    }
    else
    {
        $('#waitDaysCount').html("D+" + waitDays);
    }
    $("#leftDaysCount").html("D-" + localStorage.todoDays);
}

function celebrate() {
    $("#celebrateAnn").show();
    $('#celebrateAnn').addClass("animated tada");
    $("#anniversaryDate").css("justify-content", "space-evenly");
    // $("#pageContent").css("background-image", "url(/img/firework.png)");
}
/**
 * Image Upload / Change Couple Pic
 */
function initDb() {

    let request = indexedDB.open("couplePic", dbVersion);
    
    request.onerror = function(e) {
        console.error("데이터베이스를 열수 없습니다.");
    }
    request.onsuccess = function(e) {
        db = e.target.result;
        console.log("데이터베이스를 열었습니다.");
        console.log(db);

        let trans = db.transaction(["couplePicOS"], "readonly");
        
        //preset couple picture on load
        fetchFromDb(1);
        fetchFromDb(2);
        fetchFromDb(3);

    }
    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        db.createObjectStore("couplePicOS");
    }
}

function fileUpload(e) {
    console.log(e);
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e) {
        let bits = e.target.result;
        if (currFileNum == 1) {
            firstfile = {
                created: new Date(),
                data: bits
            }
            $("#check1").css("visibility", "visible");
        } else if (currFileNum == 2) {
            secondfile = {
                created: new Date(),
                data: bits
            }
            $("#check2").css("visibility", "visible");

        } else if (currFileNum == 3) {
            thirdfile = {
                created: new Date(),
                data: bits
            }
            $("#check3").css("visibility", "visible");
        }
    }
}

function saveToDb() {
    // db에 파일 저장
    let trans = db.transaction(["couplePicOS"], "readwrite");
    let os = trans.objectStore("couplePicOS");

    // null check first
    if (firstfile != null) {
        let addReq1 = os.put(firstfile, 1);
        addReq1.onerror = function(e) {
            console.log("데이터 저장 오류");
            console.error(e);
        }
        addReq1.onsuccess = function(e) {
            console.log("데이터 저장 성공");
            console.log(trans.objectStore("couplePicOS"));
    
            fetchFromDb(1);
        }
    }
    if (secondfile != null) {
        let addReq2 = os.put(secondfile, 2);
        addReq2.onerror = function(e) {
            console.log("데이터 저장 오류");
            console.error(e);
        }
        addReq2.onsuccess = function(e) {
            console.log("데이터 저장 성공");
            console.log(trans.objectStore("couplePicOS"));
    
            fetchFromDb(2);
        }
    }
    if (thirdfile != null) {
        let addReq3 = os.put(thirdfile, 3);
        addReq3.onerror = function(e) {
            console.log("데이터 저장 오류");
            console.error(e);
        }
        addReq3.onsuccess = function(e) {
            console.log("데이터 저장 성공");
            console.log(trans.objectStore("couplePicOS"));
    
            fetchFromDb(3);
        }
    }
}

function fetchFromDb(index) {
    console.log("fetching from DB");
    let trans = db.transaction(["couplePicOS"], "readonly");
    req = trans.objectStore("couplePicOS").get(index);
    // console.log(trans.objectStore("couplePicOS").get("key1"));
    req.onsuccess = function(e) {
        let record = e.target.result;
        console.log("성공", record);

        // display image
        if (record == null) {
            console.log("record null")
            $("#withGF" + index).attr("src", "img/imgIcon.png");
            $("#icon" + index).removeClass("fa-exchange");
            $("#icon" + index).addClass("fa-plus-circle");
        } else {
            var imgSrcStr = "data:image/jpeg;base64," + btoa(record.data)
            $("#withGF" + index).attr("src", imgSrcStr);
            $("#withGF" + index).show();
            $("#icon" + index).removeClass("fa-plus-circle");
            $("#icon" + index).addClass("fa-exchange");

            $("#betweenPic" + index).css("border", "none");
            $("#betweenPic" + index).css("background-color", "transparent");
        }
    }
}

function revertImg() {//그냥 objectstore 비우면 됨
    console.log("revertImg");
    let trans = db.transaction(["couplePicOS"], "readwrite");
    let req = trans.objectStore("couplePicOS").clear();
    req.onsuccess = function(e) {
        console.log("deleted objectstore to revert to default img");
        location.reload();
    }
}

function deleteImg(index) {
    console.log("enter deleteImg");
    let trans = db.transaction(["couplePicOS"], "readwrite");
    let req = trans.objectStore("couplePicOS").delete(index);
    req.onsuccess = function(e) {
        console.log("deleted objectstore to revert to default img");
        $("#withGF" + index).attr("src", "img/imgIcon.png");
    }
}