/**
 * ì¤ì ìë¤ê° í­ ë£ì -> í­ ì íì íìí ì°½ ëì°ë jsì¸ë° ë°ì¨ê±°ë¼ ë³ìë¶í° ì ë¶ ë¤ ë°ê¿ì¤ì¼ í¨. 
 * ì¼ë¨ì ìë ì ë¨
 *  
 * ì¤ì  í­ ë³ê²½í ë modal ì¬ì´ì¦ ì ë°ëëë¡ ì¡°ì í´ì¼í¨
 */

window.addEventListener("load", function() {

	// store tabs variable
	var myTabs = document.querySelectorAll("ul.nav-tabs > li > a");

	for (i = 0; i < myTabs.length; i++) {
		myTabs[i].addEventListener("click", myTabClicks);
    }

    function myTabClicks(tabClickEvent) {
		for (var i = 0; i < myTabs.length; i++) {
			myTabs[i].classList.remove("active");
		}
		var clickedTab = tabClickEvent.currentTarget;
		clickedTab.classList.add("active");
		tabClickEvent.preventDefault();
		var myContentPanes = document.querySelectorAll(".tab-pane");
		for (i = 0; i < myContentPanes.length; i++) {
			myContentPanes[i].classList.remove("active");
		}
		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);
		activePane.classList.add("active");
	}
});