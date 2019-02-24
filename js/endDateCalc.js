function calculateEndDate() {
    branchVal = localStorage.branch;
    var dutyLength = getDutyLength(branchVal);
    var standardDate;
    var exceptionDate1 = null;
    var exceptionDate2 = null;

    var todayObj = new Date();
    var todayObj = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());

    var enlistDateStr = localStorage.enlistDate;
    var enterDateObj = new Date(enlistDateStr.slice(0,4), enlistDateStr.slice(5,7) - 1, enlistDateStr.slice(8));

    /**
     * í¹ìì¼ì´ì¤
     * ì¡êµ°(18) - 17/08/01, 19/01/01
     * í´êµ°(20) - 17/06/01, 18/11/01
     * ì¬íë³µë¬´(21) - x
     * ê³µêµ°(22) - x (60ì¼ë§ ë¨ì¶)
     */

    //do the math
    var endDateObj = new Date(enterDateObj);
    var maxReduced = new Date(enterDateObj);

    var suppposedEndDate = enterDateObj.getDate() - 1;
    var supposedEndMonth = (enterDateObj.getMonth() + (12 - (24 - dutyLength))) % 12;
    var suppposedEndYear = enterDateObj.getFullYear() + Math.floor((enterDateObj.getMonth() + dutyLength) / 12);

    if (isValidDate(suppposedEndYear, supposedEndMonth, suppposedEndDate)) {
        endDateObj = new Date(suppposedEndYear, supposedEndMonth, suppposedEndDate);
    } else {
        endDateObj = new Date(suppposedEndYear, supposedEndMonth, suppposedEndDate);
    }
    var realEndDate = new Date(endDateObj);//ë¨ì¶ ì  ê¸°ì¡´ ì ì­ì¼

    //ìëì¼ ê¸°ì¤ì¼ë¡ ì ì­ì¼ ê³ì°, ìì¸ì¼ì´ì¤ ì½ì
    if (branchVal == "army" || branchVal == "marine" || branchVal == "police") {
        standardDate = new Date(2017, 0, 3);
        exceptionDate1 = new Date(2017, 7, 1);
        exceptionDate2 = new Date(2019, 0, 1);

    } else if (branchVal == "navy") {
        standardDate = new Date(2016, 10, 03);
        exceptionDate1 = new Date(2017, 5, 1);
        exceptionDate2 = new Date(2019, 10, 1);
    } else if (branchVal == "airForce" || branchVal == "socialService") {
        standardDate = new Date(2016, 9, 3);
    }
    var daysReduced = Math.floor((enterDateObj - standardDate) / (1000 * 3600 * 24) / 14) + 1; //2
    if ((exceptionDate1 != null && exceptionDate2 != null) && (enterDateObj - exceptionDate1 == 0 || enterDateObj - exceptionDate2 == 0)) {
        daysReduced--;
    }

    if (daysReduced > 0) {
        //ë³µë¬´ë¨ì¶ ê³ì°
        endDateObj.setDate(endDateObj.getDate() - daysReduced);

        //maxReducedêµ¬íëê±° ê¸°ì¡´ ì ì­ì¼ êµ¬íëê±°ì²ë¼ ë°ê¿
        var suppposedEndDateM = enterDateObj.getDate() - 1;
        var supposedEndMonthM = (enterDateObj.getMonth() + (12 - (24 - (dutyLength - 3)))) % 12;
        var suppposedEndYearM = enterDateObj.getFullYear() + Math.floor((enterDateObj.getMonth() + dutyLength - 3) / 12);
        if (branchVal == "airForce") {//ê³µêµ°ë§ 2ê°ì ë¨ì¶
            supposedEndMonthM = (enterDateObj.getMonth() + (12 - (24 - (dutyLength - 2)))) % 12;
            suppposedEndYearM = enterDateObj.getFullYear() + Math.floor((enterDateObj.getMonth() + dutyLength - 2) / 12);
        }
    
        if (isValidDate(suppposedEndYearM, supposedEndMonthM, suppposedEndDateM)) {
            maxReduced = new Date(suppposedEndYearM, supposedEndMonthM, suppposedEndDateM);
        } else {
            maxReduced = new Date(suppposedEndYearM, supposedEndMonthM, suppposedEndDateM);
        }

        // ìµê³  ë¨ì¶ì¼ë³´ë¤ ë§ì´ ì¤ì ìì
        if (endDateObj - maxReduced < 0) {
            localStorage.setItem("wholeDays",(maxReduced - enterDateObj) / (1000 * 60 * 60 * 24));
            localStorage.setItem("todoDays",(maxReduced - todayObj) / (1000 * 60 * 60 * 24));
            localStorage.setItem("reducedDays", (realEndDate - maxReduced) / (1000 * 60 * 60 * 24));

            localStorage.setItem("endDateYear", maxReduced.getFullYear());
            localStorage.setItem("endDateMonth", maxReduced.getMonth() + 1);
            localStorage.setItem("endDateDate", maxReduced.getDate());
            return maxReduced;
        }
        localStorage.setItem("reducedDays", daysReduced);
    } else {//ê¸°ì¡´ì ì­ì¼ 18ë 10ì 2ì¼ ì ì ë³µë¬´ë¨ì¶ ìì
        localStorage.setItem("reducedDays", 0);
    }

    localStorage.setItem("wholeDays",(endDateObj - enterDateObj) / (1000 * 60 * 60 * 24));
    localStorage.setItem("todoDays",(endDateObj - todayObj) / (1000 * 60 * 60 * 24));

    localStorage.setItem("endDateYear", endDateObj.getFullYear());
    localStorage.setItem("endDateMonth", endDateObj.getMonth() + 1);
    localStorage.setItem("endDateDate", endDateObj.getDate());

    return endDateObj;
}

function getDutyLength(branchVal) {
    switch (branchVal) {
    case "army":
        return 21;
    case "navy":
        return 23;
    case "airForce":
        return 24;
    case "marine":
        return 21;
    case "socialService":
        return 24;
    case "police":
        return 21;
    }
}