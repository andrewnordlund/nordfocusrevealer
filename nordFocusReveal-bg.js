nordFocusReveal = {
	toConsole : true,
	isInjected : false,
	check : function () {
		browser.tabs.query({active: true}, function(tabs) {
			if (!nordFocusReveal.isInjected) {
				nordFocusReveal.isInjected = true;
				browser.tabs.connect(tabs[0].id);	
			} else { 
			    browser.runtime.onMessage.addListener(nordFocusReveal.handleMessage);
				browser.tabs.connect(tabs[0].id);
			}				
		});
	},
	handleMessage : function (msg)  {
	    browser.runtime.onMessage.removeListener(nordFocusReveal.handleMessage);
		var output = "Element: " + msg["element"] + " (" + msg["id"] + ") has focus.";
	    console.log(output);	
	}
}
browser.browserAction.onClicked.addListener(nordFocusReveal.check);