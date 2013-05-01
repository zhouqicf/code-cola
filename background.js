var TITLE_ON = 'Code Cola(on)',
    TITLE_OFF = 'Code Cola(off)';

var tabStatus = {};

var toggleTabStatus = function(id){
        if(!tabStatus[id]){
            initTabStatus(id);
        }
        tabStatus[id].active = !tabStatus[id].active;
        syncTabStatus(id);
    },
    syncTabStatus = function(id){
        if(!tabStatus[id]){
            initTabStatus(id);
        }
        if(!tabStatus[id].active){
            chrome.browserAction.setTitle({"tabId": id, "title": TITLE_OFF});
            chrome.browserAction.setIcon({"tabId": id, "path": "cc-off.png"});
        }else{
            chrome.browserAction.setTitle({"tabId": id, "title": TITLE_ON});
            chrome.browserAction.setIcon({"tabId": id, "path": "cc-on.png"});
        }
    },
    initTabStatus = function(id){
        tabStatus[id] = {};
    };

chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
    if (info.status === 'complete') {
        initTabStatus(tabId);
    }
});

chrome.tabs.onActivated.addListener(function(tab){
    syncTabStatus(tab.tabId);
});

//chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
//    toggleTabStatus(tabId);
//});

chrome.browserAction.onClicked.addListener(function(tab) {
    var id = tab.id;
    if(tab.url.indexOf("https://chrome.google.com") == 0 || tab.url.indexOf("chrome://") == 0 || tab.url.indexOf("googleusercontent.com") == 0){
        alert(chrome.i18n.getMessage("error_google"));
        return;
    }else if(tab.url.indexOf("file:///") == 0){
        alert(chrome.i18n.getMessage("error_local"));
        return;
    }

    chrome.browserAction.getTitle({
        tabId: id
    }, function(title){
        chrome.tabs.sendMessage(id, 'browserAction');
        if(title === TITLE_OFF && !tabStatus[id].on){
            chrome.tabs.insertCSS(id, {file: "codecola.css"});
            chrome.tabs.insertCSS(id, {file: "code-cola-widget/src/color/codecola-color.css"});
            chrome.tabs.insertCSS(id, {file: "code-cola-widget/src/degree/codecola-degree.css"});
            chrome.tabs.insertCSS(id, {file: "code-cola-widget/src/gradient/codecola-gradient.css"});
            chrome.tabs.executeScript(id, {file: "yui3.js"});
            chrome.tabs.executeScript(id, {file: "plugin.js"});
            chrome.tabs.executeScript(id, {file: "code-cola-widget/src/color/codecola-color.js"});
            chrome.tabs.executeScript(id, {file: "code-cola-widget/src/degree/codecola-degree.js"});
            chrome.tabs.executeScript(id, {file: "code-cola-widget/src/gradient/codecola-gradient.js"});
            chrome.tabs.executeScript(id, {file: "codecola.js"});
            tabStatus[id].on = true;
        }
        toggleTabStatus(id);
    });
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    if(request == "getUrls"){
        sendResponse({
            "action": localStorage["codecola_save_action"]?localStorage["codecola_save_action"]:""
        });
    }
});