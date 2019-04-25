var cardHeader = document.querySelectorAll("div.card-header");
var switchField = document.querySelectorAll("div.switch-field");

if (localStorage.background == "img/mainback1.jpg") {
    $(".font-color").css("color", "#303030");
    $("#searchUI").css("box-shadow", "0px 0px 5px #505050");
    $(".fitBGborder").css("background-color", "#84638F");
    $(".fitBGborder").css("border-color", "#84638F"); 
    for (i = 0; i < cardHeader.length; i++) {
        $(cardHeader[i]).addClass("mainback1");
    }
    for (i = 0; i < switchField.length; i++) {
        $(switchField[i]).addClass("mainback1");
    }
    

} else if (localStorage.background == "img/mainback2.jpg") {
    $("#searchUI").css("box-shadow", "0px 0px 5px #328ba3");
    $(".fitBGborder").css("background-color", "#328ba3");
    $(".fitBGborder").css("border-color", "#328ba3");   
    for (i = 0; i < cardHeader.length; i++) {
        $(cardHeader[i]).addClass("mainback2");
    }
    for (i = 0; i < switchField.length; i++) {
        $(switchField[i]).addClass("mainback2");
    }
} else if (localStorage.background == "img/mainback3.jpg") {
    $("#searchUI").css("box-shadow", "0px 0px 5px #001C32");
    $(".fitBGborder").css("background-color", "#001C32");
    $(".fitBGborder").css("border-color", "#001C32");   
    for (i = 0; i < cardHeader.length; i++) {
        $(cardHeader[i]).addClass("mainback3");
    }
    for (i = 0; i < switchField.length; i++) {
        $(switchField[i]).addClass("mainback3");
    }
} else if (localStorage.background == "img/mainback4.jpg") {
    $("#searchUI").css("box-shadow", "0px 0px 5px #30517E");
    $(".fitBGborder").css("background-color", "#30517E");
    $(".fitBGborder").css("border-color", "#30517E");   
    for (i = 0; i < cardHeader.length; i++) {
        $(cardHeader[i]).addClass("mainback4");
    }
    for (i = 0; i < switchField.length; i++) {
        $(switchField[i]).addClass("mainback4");
    }
} else if (localStorage.background == "img/mainback5.jpg") {
    $("#searchUI").css("box-shadow", "0px 0px 5px #5e5e5e");
    $(".fitBGborder").css("background-color", "#5e5e5e");
    $(".fitBGborder").css("border-color", "#5e5e5e"); 
    for (i = 0; i < cardHeader.length; i++) {
        $(cardHeader[i]).addClass("mainback5");
    }  
    for (i = 0; i < switchField.length; i++) {
        $(switchField[i]).addClass("mainback5");
    }
} 
