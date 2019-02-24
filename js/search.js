var isSearchClosed = true;
var isHeaderWidgetShown = true;

var naverIconLink = $("#naverCB_id").val();
var googleIconLink = $("#googleCB_id").val();
var daumIconLink = $("#daumCB_id").val();
var youtubeIconLink = $("#youtubeCB_id").val();
var yahooIconLink = $("#yahooCB_id").val();
var baiduIconLink = $("#baiduCB_id").val();
var bingIconLink = $("#bingCB_id").val();

var engineArray = [];//ex) ["naver", "google", "daum", "youtube"]
// var engineHomeArray = ["https://naver.com", "https://google.com", "https://daum.net","https://youtube"];
var currEngine;//ex)"naver"

var urlString;
var targetUrlNaver = "https://search.naver.com/search.naver?ie=UTF-8&query=";
var targetUrlGoogle = "https://www.google.com/search?q=";
var targetUrlDaum = "https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&q=";
var targetUrlYoutube = "https://www.youtube.com/results?search_query=";
var targetUrlYahoo = "https://search.yahoo.com/search?p=";
var targetUrlBaidu = "https://www.baidu.com/s?wd=";
var targetUrlBing = "https://www.bing.com/search?q=";
var targetUrl;

document.getElementById("searchBar").addEventListener("keyup", onEnterPressed);
$(window).click(searchUIClose);
$(".search").click(searchUIOpen);
$("#engineLogo").click(searchEngineChange);
// $("#engineLogo").dblclick(searchEngineHome);//ì§ê¸ì í´ë¦­ì´ë ì¶©ëëì ì ë¨¹ì´ì

// $(document).ready(function() {
//     localStorage.setItem("currEngine", "naver");
// });

function onEnterPressed() {
  urlString = document.getElementById("searchBar").value;
  if(event.which==13 || event.keycode==13) {
    search();
  }
}

function search() {
  searchBar.value = "";
  targetUrl = localStorage.targetUrl;
  urlString =  targetUrl+ urlString;
  location.href = urlString;
}

function searchIcoClose() {
  searchIco.style.display ="none";
}

function searchUIOpen() {

    if (!localStorage.currEngine) {//ì²ìì ì´ììë, ê¸°ë³¸ì¼ë¡ ë¤ì´ë² ì¤ì , ê¸°ë³¸ì¼ë¡ ì´ê±° 4ê° ë£ì´ì¤
        engineArray = ["naver", "google", "daum", "youtube"];
        localStorage.setItem("currEngine", "naver");
        localStorage.setItem("targetUrl", targetUrlNaver);
        localStorage.setItem("engineArray", JSON.stringify(engineArray));
    } else {
        currEngine = localStorage.currEngine;//ë¡ì»¬ìì íì¬ ìì§ ê°ì ¸ì´

        if (currEngine == "naver") {//naver
            localStorage.setItem("targetUrl", targetUrlNaver);
        } else if (currEngine == "google") {//google
            localStorage.setItem("targetUrl", targetUrlGoogle);
        } else if (currEngine == "daum") {//daum
            localStorage.setItem("targetUrl", targetUrlDaum);
        } else if (currEngine == "youtube") {//youtube
            localStorage.setItem("targetUrl", targetUrlYoutube);
        } else if (currEngine == "yahoo") {//yahoo
            localStorage.setItem("targetUrl", targetUrlYahoo);
        } else if (currEngine == "baidu") {//baidu
            localStorage.setItem("targetUrl", targetUrlBaidu);
        } else if (currEngine == "bing") {//bing
            localStorage.setItem("targetUrl", targetUrlBing);
        }
    }

    // change engineImg in searchBar
    var currEngineLink;
    if (currEngine == "naver") {
        currEngineLink = naverIconLink;
    } else if (currEngine == "google") {
        currEngineLink = googleIconLink;
    } else if (currEngine == "daum") {
        currEngineLink = daumIconLink;
    } else if (currEngine == "youtube") {
        currEngineLink = youtubeIconLink;
    } else if (currEngine == "yahoo") {
      currEngineLink = yahooIconLink;
    } else if (currEngine == "baidu") {
      currEngineLink = baiduIconLink;
    } else if (currEngine == "bing") {
      currEngineLink = bingIconLink;
    }
    $("#engineLogo").attr("src", currEngineLink);

    if(isSearchClosed) {
        if(window.innerWidth * 2 <= screen.width) {
        $("#timeUI").hide();
        isHeaderWidgetShown = false;
        }
        searchIco.style.display = "none";
        searchUI.style.width = "45vw";
        searchBar.style.width = "40vw";
        searchBar.style.display = "inline-flex";    
        setTimeout(function() {
        searchEngine.style.display = "inline-flex";
        searchIco.style.width="50px";
        searchIco.style.display = "inline-flex";
        }, 500);
        isSearchClosed = false;

        // ë­ê°ë¥¼ ì ììëë§ ê²ìëê². ì´ì ì searchUI ì¼°ë¤ê° ë«ê³  ë¤ì í¬ë, searchIconImg ëë¬ì§ë©´ ë°ë¡ ê²ìëê°ì§ê³ , ì´ë ê² ë°ê¿.
        $("#searchIconImg").click(function() {
          if(searchBar.value != ""){
              urlString = document.getElementById("searchBar").value;
              search();
          }
        });
    }
}

function searchUIClose() {
  if ($(event.target).hasClass("search")) {
  } else{
    if(isHeaderWidgetShown == false) {
      $("#timeUI").show();
      isHeaderWidgetShown = true;
    }
    searchEngine.style.display = "none";
    searchBar.style.display = "none";
    searchBar.style.width = "0px";
    searchUI.style.width = "50px";
    searchBar.value = "";
    searchIco.style.width="50px";
    if (!isSearchClosed) {
      searchIco.style.display="none";
    }
    setTimeout(function() { searchIco.style.display = "inline-flex"; }, 500);
    isSearchClosed = true;    
    $("#engineLogo").removeClass("animated flipInX");
  }
}
var click=false;
function searchEngineChange() {
    engineArray = JSON.parse(localStorage.engineArray);

    var nextEngineInd = (jQuery.inArray(currEngine, engineArray) + 1) % engineArray.length;
    var nextEngine = engineArray[nextEngineInd];

    localStorage.setItem("currEngine", nextEngine);

    $("#engineLogo").addClass("animated flipInX");
    $("#engineLogo").mousedown(function() {
      $("#engineLogo").removeClass("animated flipInX");
    });
}

// function searchEngineHome() {
//   location.href = engineHomeArray[localStorage.index];
// }
