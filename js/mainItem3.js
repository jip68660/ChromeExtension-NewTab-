$('#dateBox').click(toggle);
$("#infoBox").click(toggle2);
$(document).ready(function() {

    $("body").css({
        "text-align": "center"
    });
    
    checking();
    
       
});

function checking(){
    // if (!localStorage.loverName || !localStorage.loverBD || !localStorage.userBD || !localStorage.relStartDate){
    //     $("#anniversaryDate").html("ì¤ì ìì 'ì°ë¦¬ì¬ì´'ì ì ë³´ë¥¼ ìë ¥í´ì£¼ìê¸° ë°ëëë¤");
    // }
    if (!localStorage.loverName || !localStorage.relStartDate){//íì±íë ëëë° initìì ì´ê±° ëê° ë°ì ì ë°ìì... ì´ê±°ë¼ë ìì¼ë©´ display
        $("#instruction").show();  
        $("#pageContent").hide(); 
    } else {
        $("#instruction").hide(); 
        $("#pageContent").show(); 

        $("#userName").html(localStorage.name);
        $("#loverName").html(localStorage.loverName);
        $("#daysInRel").html(Math.floor((new Date() - new Date(localStorage.relStartDate)) / (1000 * 3600 * 24)) + 1);
        $("#infoBox").hide();
        

    }
}

function toggle() {
    $('#dateBox').hide();
    $('#infoBox').show();

    var waitDays = Math.floor((new Date() - new Date(localStorage.relStartDate)) / (1000 * 3600 * 24))+1;
    var doneDays = localStorage.wholeDays - localStorage.todoDays;
    if (waitDays > doneDays){
        $("#waitDaysCount").html(doneDays);
    }
    else
    {
        $('#waitDaysCount').html(waitDays);
    }
    // $("#waitDaysCount").html(Math.floor((new Date() - new Date(localStorage.relStartDate)) / (1000 * 3600 * 24))+1);
    $("#leftDaysCount").html(localStorage.todoDays);
}
function toggle2(){
    $('#infoBox').hide();
    $('#dateBox').show();
}