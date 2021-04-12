(function() {
    "use strict";

    /* globals chrome */

    const app = window.app;
    const ui = app.ui;
    const util = app.util;

    app.mainSuggest = app.suggest();
    app.requestHeadersSuggest = app.suggest();
    app.responseHeadersSuggest = app.suggest();
    app.files = {};
    app.skipNextSync = false;

    function renderData() {
        app.files = {};
        ui.domainDefs.children().remove();
        chrome.runtime.sendMessage({action: "getDomains"}, function(domains) {
            if (domains.length) {
                domains.forEach(function(domain) {
                    const domainMarkup = app.createDomainMarkup(domain);
                    ui.domainDefs.append(domainMarkup);
                });
            } else {
                const newDomain = app.createDomainMarkup({rules: [{type: "normalOverride"}]});
                ui.domainDefs.append(newDomain);
                newDomain.find(".domainMatchInput").val("*");
                chrome.runtime.sendMessage({
                    action: "saveDomain",
                    data: app.getDomainData(newDomain)
                });
                app.skipNextSync = true;
            }
            util.getTabResources(function(res) {
                app.mainSuggest.fillOptions(res);
            });
        });
    }

    function setupSynchronizeConnection() {
        chrome.runtime.sendMessage({action: "syncMe"}, function() {
            if (!app.skipNextSync) {
                renderData();
            }
            app.skipNextSync = false;
            setupSynchronizeConnection();
        });
    }

    function init() {
        app.mainSuggest.init();
        app.requestHeadersSuggest.init();
        app.responseHeadersSuggest.init();
        app.requestHeadersSuggest.fillOptions(app.headersLists.requestHeaders);
        app.responseHeadersSuggest.fillOptions(app.headersLists.responseHeaders);

        setupSynchronizeConnection();

        renderData();

        ui.addDomainBtn.on("click", function() {
            const newDomain = app.createDomainMarkup();
            newDomain.find(".domainMatchInput").val("*");
            ui.domainDefs.append(newDomain);
            chrome.runtime.sendMessage({action: "saveDomain", data: app.getDomainData(newDomain)});
            app.skipNextSync = true;
        });

        ui.helpBtn.on("click", function() {
            ui.helpOverlay.toggle();
        });

        ui.helpCloseBtn.on("click", function() {
            ui.helpOverlay.hide();
        });
        ui.OldoptionsBtn.on("click", function() {
            ui.OldoptionsPopOver.toggle();
        });

        ui.enlanguage.on("click", function() {
            ui.enguide.show();
            ui.viguide.hide();
        });
        ui.vilanguage.on("click", function() {
            ui.viguide.show();
            ui.enguide.hide();
        });

        if (!chrome.devtools) {
            chrome.runtime.sendMessage({
                action: "getSetting",
                setting: "tabPageNotice"
            }, function(data) {

                if (data !== "true") {
                    ui.tabPageNotice.find("a").on("click", function(e) {
                        e.preventDefault();
                        chrome.runtime.sendMessage({
                            action: "setSetting",
                            setting: "tabPageNotice",
                            value: "true"
                        });
                        ui.tabPageNotice.fadeOut();
                    });
                    ui.tabPageNotice.fadeIn();
                    setTimeout(function() {
                        ui.tabPageNotice.fadeOut();
                    }, 6000);
                }
            });
        }
    }

    init();

})();
