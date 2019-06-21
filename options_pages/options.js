if (typeof (nordFocusRevealOpts) == "undefined") {
	var nordFocusRevealOpts = {};
}
nordFocusRevealOpts = {
	dbug : false,

	init : function () {
		var els = {"saveBtn" : null,
			"consoleA":null,
			"borderA":null,
			"highlightA":null,
			"aboutA":null,
			"consoleSec":null,
			"borderSec":null,
			"highlightSec":null,
			"aboutSec":null,
		}
		var inputs = {
			"consoleOutputChk":null,
			"consoleDebugChk":null,
			"consoleAlertChk":null
		}
		for (el in els) {
			els[el] = document.getElementById(el);
		}
		els["saveBtn"].addEventListener("click", nordFocusReveal.saveOptions(null, nordFocusReveal.errorFun);

	},
	gatherValues

}

if (nordFocusRevealOpts.dbug) console.log ("nordFocusReveal.js loaded");

nordFocusReveal.loadOptions(nordFocusRevealOpts.init, nordFocusReveal.errorFun);
