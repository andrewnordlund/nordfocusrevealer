if (typeof (nordFocusRevealOpts) == "undefined") {
	var nordFocusRevealOpts = {};
}
nordFocusRevealOpts = {
	dbug : false,
	els : {"saveBtn" : null,
		"consoleA":null,
		"borderA":null,
		"highlightA":null,
		"aboutA":null,
		"consoleSec":null,
		"borderSec":null,
		"highlightSec":null,
		"aboutSec":null,
	},
	inputs : {
		"consoleOutputChk":null,
		"consoleDebugChk":null,
		"consoleAlertChk":null
	},
	init : function () {
		
		for (el in nordFocusRevealOptsels) {
			nordFocusRevealOpts.els[el] = document.getElementById(el);
		}
		for (ins in nordFocusRevealOpts.inputs) {
			nordFocusRevealOpts.inputs[ins] = document.getElementById(ins);
		}
		nordFocusRevealOpts.els["saveBtn"].addEventListener("click", 
			function () {
				nordFocusReveal.saveOptions(null, nordFocusReveal.errorFun);
			}, false);
		nordFocusRevealOpts.fillInputs();

	}, // End of init
	fillInputs : function () {
		nordFocusRevealOpts.inputs["consoleOutputChk"].checked = nordFocusReveal.options["consoleOutput"];
		nordFocusRevealOpts.inputs["consoleDebugChk"].checked = nordFocusReveal.options["consoleDebug"];
		nordFocusRevealOpts.inputs["consoleAlertChk"].checked = nordFocusReveal.options["consoleAlert"];
	}, // End of fillInputs
	setupLinks : function () {
		var parts = ["console", "border", "highlight", "about"];
		for (var p in parts) {
			nordFocusRevealOpts.els[p+"A"].addEventListener("click", nordFocusRevealOpts.toggleSection, false);
		}
	}, // End of setupLinks
	toggleSection : function(e) {
		
	}, // End of toggleSection
}

if (nordFocusRevealOpts.dbug) console.log ("nordFocusReveal.js loaded");

nordFocusReveal.loadOptions(nordFocusRevealOpts.init, nordFocusReveal.errorFun);
