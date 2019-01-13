function calculateEndDate() {
    branchVal = localStorage.branch;
    var dutyLength = getDutyLength(branchVal);
    var standardDate = new Date(2018, 9, 2);

    var todayObj = new Date();
    var todayObj = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());

    var enlistDateStr = localStorage.enlistDate;
    var enterDateObj = new Date(enlistDateStr.slice(0,4), enlistDateStr.slice(5,7) - 1, enlistDateStr.slice(8));

    /**
     * 1) 18년 10월 2일 전 전역은 그대로 출력
     * 2) 줄어드는 날짜 계산
     * 3) 3개월보다 많이 줄 수 없음
     * 4) 호현 케이스 예외
     * 5) 입력된 날짜가 미래일 경우, 입대까지 카운트다운
     * 
     * 특수케이스 작업
     * 육군(18) - 17/08/01, 19/01/01
     * 해군(20) - 
     * 사회복무(21) - 
     * 공군(22) - 
     */

    //do the math
    var endDateObj = new Date(enterDateObj);
    var maxReduced = new Date(enterDateObj);
    endDateObj.setMonth(enterDateObj.getMonth() + dutyLength);
    endDateObj.setDate(enterDateObj.getDate() - 1);//expected end date without reduced service

    var daysReduced = Math.floor((endDateObj - standardDate) / (1000 * 3600 * 24) / 14) + 1; //2

    if (daysReduced > 0) {
        endDateObj.setDate(endDateObj.getDate() - daysReduced);//2

        if (branchVal == "airForce") {
            maxReduced.setMonth(maxReduced.getMonth() + dutyLength - 2);
        } else {
            maxReduced.setMonth(maxReduced.getMonth() + dutyLength - 3);
        }
        maxReduced.setDate(maxReduced.getDate() - 1);

        if (endDateObj - maxReduced < 0) {
            return maxReduced;
        }
    }
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
    case "fireDept":
        return 23;
    }
}