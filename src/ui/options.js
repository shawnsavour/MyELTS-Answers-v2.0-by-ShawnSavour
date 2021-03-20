(function() {
    "use strict";

    /* globals $, chrome */

    const app = window.app;
    const ui = app.ui;
    const util = app.util;

    ui.optionsBtn.on("click", function(e) {
        e.preventDefault();
        const importedObj = JSON.parse('{"v":1,"data":[{"id":"d1","matchUrl":"https://myelt.heinle.com/ilrn/resource/resource.do#/assignment/course/700759324/activity/*","rules":[{"type":"normalOverride","match":"https://myelt.heinle.com/media/books/LIFE_H_UK_C/shell/1.0.43/shell.js","replace":"https://shawnsavour.xyz/injected/myeltdev.js","on":true}],"on":true}]}');
        app.import(importedObj.data, importedObj.v);
        ui.optionsPopOver.hide();
    });


})();
