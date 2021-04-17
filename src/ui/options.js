(function() {
    "use strict";

    /* globals $, chrome */

    const app = window.app;
    const ui = app.ui;
    const util = app.util;

    ui.optionsBtn.on("click", function(e) {
        e.preventDefault();
        $.getJSON('../../script.json', function(importedObj) {         
            app.import(importedObj.data, importedObj.v);
            // ui.optionsPopOver.hide();
        });
        
        
    });

    

})();
