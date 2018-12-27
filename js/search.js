document.getElementById("searchBar").addEventListener("keyup", onEnterPressed);
document.getElementById("searchUI").addEventListener("mouseover", searchBarOpen);
document.getElementById("searchUI").addEventListener("mouseleave", searchBarClose);

var urlString="";

function onEnterPressed() {

  urlString = document.getElementById("searchBar").value;
  if(event.which==13 || event.keycode==13) {
    searchBar.value = "";
    urlString = "http://www.google.com/search?q=" + urlString;
    location.href = urlString;
  }
}

function searchBarOpen() {
	searchUI.style.width = "30em";
	searchBar.style.display = "inline";
}

function searchBarClose() {
	searchUI.style.width = "3em";
	searchBar.style.display = "none";
	searchBar.value = "";
}