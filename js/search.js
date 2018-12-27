document.getElementById("searchBar").addEventListener("keyup", onEnterPressed);

var urlString="";

function onEnterPressed() {

  urlString = document.getElementById("searchBar").value;
  if(event.which==13 || event.keycode==13) {
    searchBar.value = "";
    urlString = "http://www.google.com/search?q=" + urlString;
    location.href = urlString;
  }
}