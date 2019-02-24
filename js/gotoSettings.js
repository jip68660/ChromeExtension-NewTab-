$("#iframe").on("load",function() {
    var iframeContent = $("#iframe").contents();

    iframeContent.find(".rankSettings").click(function() {
        presetSettings();
        $("#settingsModal").modal("show");
        setDefaultSettingsTab(2);
    });
});

// $("#iframe").contents().find("#toRankSettingsButton").click(function() {
//     alert("hi");
//     presetSettings();
//     $("#settingsModal").modal("show");
//     setDefaultSettingsTab(2);
// });