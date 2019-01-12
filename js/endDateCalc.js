function calculateEndDate() {
    var dutyLength = getDutyLength();
    var standardDate = new Date(2017, 0, 3);
    var todayObj = new Date();
    var todayObj = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());
    var enlistDateStr = localStorage.enlistDate;
    var dateObj = new Date(enlistDateStr.slice(0,4), enlistDateStr.slice(5,7) - 1, enlistDateStr.slice(8));

    //get number of days reduced... get code from RAWS excel?
    var daysReduced = Math.floor((dateObj - standardDate) / (1000 * 3600 * 24) / 14) + 1;

    //do the math
    dateObj.setMonth(dateObj.getMonth() + dutyLength);//ê¸°ë³¸ ë³µë¬´ê¸°ê° ëí´ì£¼ê³ 
    dateObj.setDate(dateObj.getDate() - 1);//ë ì§ ê°ìê±° íë£¨ ë¹¼ì£¼ê³ 
    if (daysReduced > 0) {
        var maxReduced = dateObj.setMonth(dateObj.getMonth() - 3);
        if (maxReduced - dateObj.setDate(dateObj.getDate() - daysReduced) < 0) {//ë¨ì¶ê¸°ê° ìµëì¹ë³´ë¤ ë ì¤ì ìì
            dateObj = maxReduced;
        } else {
            dateObj.setDate(dateObj.getDate() - daysReduced);//ì¤ì´ë  ë ì§ ë¹¼ì¤
        }
    }
    console.log(dateObj);//ì´ê² ì ì­ì¼
}

function getDutyLength() {
    var branchVal = localStorage.branch;
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
    case "fireDept":
        return 23;
    }
}