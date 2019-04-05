/**
 * 설정에다가 탭 넣음 -> 탭 선택시 필요한 창 띄우는 js인데 따온거라 변수부터 전부 다 바꿔줘야 함. 
 * 일단은 작동 잘 됨
 *  
 * 설정 탭 변경할때 modal 사이즈 안 바뀌도록 조정해야함
 */

window.addEventListener("load", function() {
	
	// store tabs variable
	var myTabs = document.querySelectorAll("div.main > ul.nav-tabs > li > a");
	var mySubTabs = document.querySelectorAll("div.sub > ul.nav-tabs > li > a");
	for (i = 0; i < myTabs.length; i++) {
		myTabs[i].addEventListener("click", myTabClicks);
	}
	for (i = 0; i < mySubTabs.length; i++) {
		mySubTabs[i].addEventListener("click", mySubTabClicks);
	}

    function myTabClicks(tabClickEvent) {
		for (var i = 0; i < myTabs.length; i++) {
			myTabs[i].classList.remove("active");
		}
		var clickedTab = tabClickEvent.currentTarget;
		clickedTab.classList.add("active");
		tabClickEvent.preventDefault();
		var myContentPanes = document.querySelectorAll("div#tabContent > .tab-pane");
		for (i = 0; i < myContentPanes.length; i++) {
			myContentPanes[i].classList.remove("active");
		}
		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);
		activePane.classList.add("active");
	}

	function mySubTabClicks(tabClickEvent) {
		for (var i = 0; i < mySubTabs.length; i++) {
			mySubTabs[i].classList.remove("active");
		}
		var clickedTab = tabClickEvent.currentTarget;
		clickedTab.classList.add("active");
		tabClickEvent.preventDefault();
		var myContentPanes = document.querySelectorAll("div#subTabContent > .tab-pane");
		for (i = 0; i < myContentPanes.length; i++) {
			myContentPanes[i].classList.remove("active");
		}
		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);
		activePane.classList.add("active");
	}
});