document.getElementById("searchBar").addEventListener("keyup", onEnterPressed);
document.getElementById("searchBar").addEventListener("focus", onSearchFocus);
document.getElementById("searchBar").addEventListener("blur", onSearchBlur);
document.getElementById("searchUI").addEventListener("mouseover", searchBarOpen);
document.getElementById("searchUI").addEventListener("mouseleave", searchBarClose);
document.getElementById("searchIco").addEventListener("mouseover", searchBarOpen);
document.getElementById("searchIco").addEventListener("mouseleave", searchIcoClose);

var urlString="";

function onEnterPressed() {

  urlString = document.getElementById("searchBar").value;
  if(event.which==13 || event.keycode==13) {
    searchBar.value = "";
    urlString = "https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + urlString;
    //urlString = "https://www.google.com/search?q=" + urlString;
    location.href = urlString;
  }
}

function searchIcoClose() {
  searchIco.style.display ="none";
}

function searchBarOpen() {
	searchUI.style.width = "10em";
  searchBar.style.display = "inline";
  searchIcoClose();
}

function searchBarClose() {
	searchUI.style.width = "2em";
	searchBar.style.display = "none";
  searchBar.value = "";
  searchIco.style.display = "inline";
}

function onSearchFocus() {
  searchBar.placeholder = "";
}

function onSearchBlur() {
  searchBar.placeholder = "ë¤ì´ë²ë¡ ê²ì";
  // searchBar.placeholder = "Search Google";
}