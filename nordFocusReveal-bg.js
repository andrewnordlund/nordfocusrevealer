if (typeof (nordFocusRevealBG) == "undefined") {
	var nordFocusRevealBG = {};
}

nordFocusRevealBG = {
	dbug : nordFocusReveal.dbug,
	/*isInjected : false,*/
	check : function () {
		var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then(function (tabs) {
			if (nordFocusRevealBG.dbug) console.log ("About to call the content script.");
			browser.tabs.sendMessage(tabs[0].id, {"task" : "reveal", "options" : nordFocusReveal.options}).catch(function (x) {
			if (nordFocusRevealBG.dbug) console.log ("Caught something: " + x.toString());
				if (x.toString() == "Error: Could not establish connection. Receiving end does not exist.") {
					//browser.tabs.executeScript(tabs[0].id, {file : "/libs/nordburg.js"}).then (function () {
						//browser.tabs.executeScript(tabs[0].id, {file : "/libs/nordFocusReveal.js"}).then(function () {
							browser.tabs.executeScript(tabs[0].id, {file : "/content_scripts/nordFocusReveal-cs.js"}).then(function () {
								browser.tabs.sendMessage(tabs[0].id, {"task" : "reveal", "options" : nordFocusReveal.options});
							}, nordFocusReveal.errorFun);
						//}, nordFocusReveal.errorFun);
					//}, nordFocusReveal.errorFun);
				}
			});
		});
		/*
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			if (!nordFocusReveal.isInjected) {
				nordFocusReveal.isInjected = true;
				browser.tabs.connect(tabs[0].id);	
			} else { 
			    browser.runtime.onMessage.addListener(nordFocusReveal.handleMessage);
				browser.tabs.connect(tabs[0].id);
			}				
		});
		*/
	},
	/*
	handleMessage : function (msg)  {
	    browser.runtime.onMessage.removeListener(nordFocusReveal.handleMessage);
		var output = "Element: " + msg["element"] + " (" + msg["id"] + ") has focus.";
	    console.log(output);	
	}
	*/
}
browser.browserAction.onClicked.addListener(nordFocusRevealBG.check);
let changeHandler = function () {
	
	nordFocusReveal.loadOptions(function () {nordFocusRevealBG.dbug = nordFocusReveal.options["consoleDebug"];}, nordFocusReveal.errorFun);
}
if (!browser.storage.onChanged.hasListener(changeHandler)) browser.storage.onChanged.addListener(changeHandler);
