$('#dateBox').click(toggle);
$("#infoBox").click(toggle2);
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
// var dateFormat = new Date();

$(document).ready(function() {

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
        $("#daysInRel").html(Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - new Date(relDate.getFullYear(), relDate.getMonth(), relDate.getDate())) / (1000 * 3600 * 24)) + 1);
        $("#infoBox").hide();  

        console.log('dom content loaded');
        $("#imgUpload").change(doFile);
        $("#imgSubmit").click(doImageTest);
        initDb();
    }    
}

function checkAnniversary() {    
    var anniversaryDateArray = [];
    //100일, 200일, 300일, .... 추가
    for (var i = 1; i<11; i++){
        var relCal = relDate;
        relCal.setDate(relDate.getDate() + i*100 - 1);
        anniversaryDateArray.push(relCal);
        relDate = new Date(localStorage.relStartDate);
    }
    //1주년, 2주년...4주년까지 추가 -> 4주년 이후로는 그냥 안해도 될꺼같음, 아니면 그 위로는 글귀띄워도 재미있을듯. ex)"결혼하셔야죠 이제"
    for (var i = 1; i<5; i++){
        relCal365 = new Date(relDate.getFullYear() + i, relDate.getMonth(), relDate.getDate());
        anniversaryDateArray.push(relCal365);
    }    

    if (localStorage.loverBD && localStorage.userBD){
        var lastYearLoverBD = new Date(today.getFullYear() - 1, loverBD.getMonth(), loverBD.getDate());
        var thisYearLoverBD = new Date(today.getFullYear(), loverBD.getMonth(), loverBD.getDate());
        var nextYearLoverBD = new Date(today.getFullYear() + 1, loverBD.getMonth(), loverBD.getDate());
        var lastYearUserBD = new Date(today.getFullYear() - 1, userBD.getMonth(), userBD.getDate());
        var thisYearUserBD = new Date(today.getFullYear(), userBD.getMonth(), userBD.getDate());
        var nextYearUserBD = new Date(today.getFullYear() + 1, userBD.getMonth(), userBD.getDate());
        anniversaryDateArray.push(lastYearLoverBD);
        anniversaryDateArray.push(thisYearLoverBD);
        anniversaryDateArray.push(nextYearLoverBD);
        anniversaryDateArray.push(lastYearUserBD);
        anniversaryDateArray.push(thisYearUserBD);
        anniversaryDateArray.push(nextYearUserBD);
    }
    console.log(anniversaryDateArray);

    for (var i = 0; i < anniversaryDateArray.length; i++){
        if(isValidDate(anniversaryDateArray[i].getFullYear(), anniversaryDateArray[i].getMonth(), anniversaryDateArray[i].getDate())){    
            //toISOString()하면 무조건 UTC기준으로 간다고 해서 local timezoneOffSet 확인해줘야함
            var convertUTCtoKST = new Date(anniversaryDateArray[i] - timeZoneOffSet);
            anniversaryDateArray[i] = convertUTCtoKST.toISOString().slice(0,10).replace(/-/g, "");
        }
    }
    //현재시간 추가
    anniversaryDateArray.push(todayISO);
    anniversaryDateArray.sort();
    console.log(anniversaryDateArray);

    for (var i = 0; i < anniversaryDateArray.length; i++) {
        var dateCheck = anniversaryDateArray[i];
        if (dateCheck == todayISO){
            
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

function toggle() {
    $('#dateBox').hide();
    $('#infoBox').show();

    var waitDays = Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - new Date(relDate.getFullYear(), relDate.getMonth(), relDate.getDate())) / (1000 * 3600 * 24)) + 1;
    var doneDays = localStorage.wholeDays - localStorage.todoDays;
    if (waitDays > doneDays){
        $("#waitDaysCount").html(doneDays);
    }
    else
    {
        $('#waitDaysCount').html(waitDays);
    }
    // $("#waitDaysCount").html(Math.floor((new Date() - new Date(localStorage.relStartDate)) / (1000 * 3600 * 24))+1);
    $("#leftDaysCount").html(localStorage.todoDays);
}

function toggle2(){
    $('#infoBox').hide();
    $('#dateBox').show();
}


/**
 * Image Upload / Change Couple Pic
 */
let db;
let dbVersion = 1;
let dbReady = false;

// $(document).ready(function() {
//     console.log('dom content loaded');
//     $("#imgUpload").change(doFile);
//     $("#imgSubmit").click(doImageTest);

//     initDb();
// });

function initDb() {
    let request = indexedDB.open("couplePic", dbVersion);
    
    request.onerror = function(e) {
        console.error("데이터베이스를 열수 없습니다.");
    }
    request.onsuccess = function(e) {
        db = e.target.result;
        console.log("데이터베이스를 열었습니다.");
    }
    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        db.createObjectStore("couplePicOS");
    }
}

function doFile(e) {
    console.log("change event fired for input field");
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e) {
        let bits = e.target.result;
        let obj = {
            created: new Date(),
            data:bits
        }
        let trans = db.transaction(["couplePicOS"], "readwrite");
        let addReq = trans.objectStore("couplePicOS").put(obj, 0);
        addReq.onerror = function(e) {
            console.log("데이터 저장 오류");
            console.error(e);
        }
        trans.oncomplete = function(e) {
            console.log("데이터 저장 성공");
        }
    }
}

function doImageTest() {
    console.log("doImageTest");
    let recordToLoad = 0;
    let trans = db.transaction(["couplePicOS"], "readonly");

    let req = trans.objectStore("couplePicOS").get(recordToLoad);
    req.onsuccess = function(e) {
        let record = e.target.result;
        console.log("성공", record);
        var imgSrcStr = "data:image/jpeg;base64," + btoa(record.data)
        $("#withGF").attr("src", imgSrcStr);
    }
} 

$(".imgSetting").click(function() {
    $("#settingsModal").modal("hide");
});

$("#imgSubmit").click(function() {
    settingButton.style.display = "none";
});