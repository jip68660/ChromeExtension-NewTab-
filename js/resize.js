window.onresize = resizeBrowser;

function resizeBrowser(){
    
    if(localStorage.length!=0) {
        // 모니터 해상도를 가져와서 가로 세로 비율 구해줌
        var sizeRate = screen.height / screen.width;

        // slice(0,2)는 xx%에서 % 떼주는거 그래서 10% 밑으로 안가게 막아줘야됨 아니면 그 밑으로 갈 때 처리해줘야 되는데 그 너머에서 막는게 나을 듯
        // heightSize에서 180 빼주는거는 header, footer 더한 거. 일단 px로 처리함
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

    // if(!isHeaderWidgetShown && !isSearchClosed && window.innerWidth * 2 > screen.width) {//창크기가 반보다 작은상태에서 검색이 열림 -> 창크기 확대
    //     isHeaderWidgetShown = true;
    //     $("#timeUI").show();
    // }
    // else if(isHeaderWidgetShown && !isSearchClosed && window.innerWidth *2 <= screen.width) { // 창 크기가 반보다 큰 상태에서 검색이 열림 -> 창 크기 축소
    //     isHeaderWidgetShown = false;
    //     $("#timeUI").hide();
    // }

    // if(localStorage.length!=0) {
    //     // 모니터 해상도를 가져와서 가로 세로 비율 구해줌
    //     var sizeRate = screen.height / screen.width;

    //     var dateSliderWidth = Number(dateSlider.style.width.slice(0,2));
    //     var dateSliderHeight = Number(dateSlider.style.height.slice(0,2));

    //     // slice(0,2)는 xx%에서 % 떼주는거 그래서 10% 밑으로 안가게 막아줘야됨 아니면 그 밑으로 갈 때 처리해줘야 되는데 그 너머에서 막는게 나을 듯
    //     // heightSize에서 180 빼주는거는 header, footer 더한 거. 일단 px로 처리함
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

    // if(!isHeaderWidgetShown && !isSearchClosed && window.innerWidth * 2 > screen.width) {//창크기가 반보다 작은상태에서 검색이 열림 -> 창크기 확대
    //     isHeaderWidgetShown = true;
    //     $("#timeUI").show();
    // }
    // else if(isHeaderWidgetShown && !isSearchClosed && window.innerWidth *2 <= screen.width) { // 창 크기가 반보다 큰 상태에서 검색이 열림 -> 창 크기 축소
    //     isHeaderWidgetShown = false;
    //     $("#timeUI").hide();
    // }
}