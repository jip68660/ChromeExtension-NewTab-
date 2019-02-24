window.onresize = resizeBrowser;

function resizeBrowser(){

    if(localStorage.length!=0) {
        // ëª¨ëí° í´ìëë¥¼ ê°ì ¸ìì ê°ë¡ ì¸ë¡ ë¹ì¨ êµ¬í´ì¤
        var sizeRate = screen.height / screen.width;

        // slice(0,2)ë xx%ìì % ë¼ì£¼ëê±° ê·¸ëì 10% ë°ì¼ë¡ ìê°ê² ë§ìì¤ì¼ë¨ ìëë©´ ê·¸ ë°ì¼ë¡ ê° ë ì²ë¦¬í´ì¤ì¼ ëëë° ê·¸ ëë¨¸ìì ë§ëê² ëì ë¯
        // heightSizeìì 180 ë¹¼ì£¼ëê±°ë header, footer ëí ê±°. ì¼ë¨ pxë¡ ì²ë¦¬í¨
        var widthSize = (window.innerWidth) * 0.7;
        var heightSize = (window.innerHeight - 180) * 0.8;

        if(widthSize * sizeRate > heightSize) {
            dateSlider.style.height = heightSize + "px";
            dateSlider.style.width = heightSize / sizeRate + "px";
        }
        else {
            dateSlider.style.width = widthSize + "px";
            dateSlider.style.height = widthSize * sizeRate + "px";
        }
    }

    if(!isHeaderWidgetShown && !isSearchClosed && window.innerWidth * 2 > screen.width) {//ì°½í¬ê¸°ê° ë°ë³´ë¤ ìììíìì ê²ìì´ ì´ë¦¼ -> ì°½í¬ê¸° íë
        isHeaderWidgetShown = true;
        $("#timeUI").show();
    }
    else if(isHeaderWidgetShown && !isSearchClosed && window.innerWidth *2 <= screen.width) { // ì°½ í¬ê¸°ê° ë°ë³´ë¤ í° ìíìì ê²ìì´ ì´ë¦¼ -> ì°½ í¬ê¸° ì¶ì
        isHeaderWidgetShown = false;
        $("#timeUI").hide();
    }

    // if(localStorage.length!=0) {
    //     // ëª¨ëí° í´ìëë¥¼ ê°ì ¸ìì ê°ë¡ ì¸ë¡ ë¹ì¨ êµ¬í´ì¤
    //     var sizeRate = screen.height / screen.width;

    //     var dateSliderWidth = Number(dateSlider.style.width.slice(0,2));
    //     var dateSliderHeight = Number(dateSlider.style.height.slice(0,2));

    //     // slice(0,2)ë xx%ìì % ë¼ì£¼ëê±° ê·¸ëì 10% ë°ì¼ë¡ ìê°ê² ë§ìì¤ì¼ë¨ ìëë©´ ê·¸ ë°ì¼ë¡ ê° ë ì²ë¦¬í´ì¤ì¼ ëëë° ê·¸ ëë¨¸ìì ë§ëê² ëì ë¯
    //     // heightSizeìì 180 ë¹¼ì£¼ëê±°ë header, footer ëí ê±°. ì¼ë¨ pxë¡ ì²ë¦¬í¨
    //     var widthSize = (window.innerWidth) * dateSliderWidth / 100 * 0.9;
    //     var heightSize = (window.innerHeight - 180) * dateSliderHeight / 100;

    //     if(widthSize * sizeRate > heightSize) {
    //         iframe.style.height = heightSize + "px";
    //         iframe.style.width = heightSize / sizeRate + "px";
    //         // console.log(heightSize);
    //     }
    //     else {
    //         iframe.style.width = widthSize + "px";
    //         iframe.style.height = widthSize * sizeRate + "px";
    //     }
    // }

    // if(!isHeaderWidgetShown && !isSearchClosed && window.innerWidth * 2 > screen.width) {//ì°½í¬ê¸°ê° ë°ë³´ë¤ ìììíìì ê²ìì´ ì´ë¦¼ -> ì°½í¬ê¸° íë
    //     isHeaderWidgetShown = true;
    //     $("#timeUI").show();
    // }
    // else if(isHeaderWidgetShown && !isSearchClosed && window.innerWidth *2 <= screen.width) { // ì°½ í¬ê¸°ê° ë°ë³´ë¤ í° ìíìì ê²ìì´ ì´ë¦¼ -> ì°½ í¬ê¸° ì¶ì
    //     isHeaderWidgetShown = false;
    //     $("#timeUI").hide();
    // }
}