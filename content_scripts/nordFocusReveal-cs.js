if (typeof (nordFocusRevealCS) == "undefined") {
	var nordFocusRevealCS = {};
}

nordFocusRevealCS = {
	dbug : false,
	elementOnFocus : null,
	options : {
		"consoleOutput":false,
		"consoleDebug":false,
		"consoleAlert":false,
		
		"showBorder" : true,
		"borderColor" : "red",
		"borderType" : "Solid",

		"showHighlight" : false,
		"hightlightColor" : "gray",
	},
	run : function () {
		nordFocusRevealCS.elementOnFocus = null;
		nordFocusRevealCS.getFocusedItem();

		if (nordFocusRevealCS.dbug) console.log("Got the focused item.  Now to reveal it to all.");

		var output = "Element: " + nordFocusRevealCS.elementOnFocus.toString() + " (" + (nordFocusRevealCS.elementOnFocus.hasAttribute("id") ? "#" + nordFocusRevealCS.elementOnFocus.getAttribute("id") : "No id") + ") has focus.";
		if (nordFocusRevealCS.dbug) {
			var log = [];
			for (let k in nordFocusRevealCS.options) log.push(k + ": " + nordFocusRevealCS.options[k]);
			console.log (log.join(", "));
		}

		if (nordFocusRevealCS.dbug) console.log("consoleOutput: " + nordFocusRevealCS.options["consoleOutput"] + ".");
		if (nordFocusRevealCS.options["consoleOutput"] == true) console.log (output);
		if (nordFocusRevealCS.options["consoleAlert"] == true) alert (output);
		
		if (nordFocusRevealCS.options["showBorder"] == true) nordFocusRevealCS.showBorder();
		
		if (nordFocusRevealCS.options["showHighlight"] == true) nordFocusRevealCS.showHighlight();

	}, // End of getFocusItem
	getFocusedItem: function () {
        	if (nordFocusRevealCS.dbug) console.log("Getting focused item");
	        nordFocusRevealCS.elementOnFocus = document.activeElement;
        	if (nordFocusRevealCS.dbug) console.log("Got focused item");
        	if (nordFocusRevealCS.dbug) console.log("Focused item: " + nordFocusRevealCS.elementOnFocus + ".");
	}, // End of getFocusItem
	
	showBorder : function () {
		var oldborder = nordFocusRevealCS.elementOnFocus.style.border;
		if (nordFocusRevealCS.dbug) console.log ("Old border: " + oldborder + ".");
		nordFocusRevealCS.elementOnFocus.style.border = "8px " + nordFocusRevealCS.options["borderType"] + " " + nordFocusRevealCS.options["borderColor"];
	        setTimeout(function () {
        		nordFocusRevealCS.elementOnFocus.style.border = oldborder;
	        }, 250);
	}, // End of showBorder
	showHighlight : function () {
		var oldbackground = nordFocusRevealCS.elementOnFocus.style.backgroundColor;
		if (nordFocusRevealCS.dbug) console.log ("Old background: " + oldbackground + ".");
		nordFocusRevealCS.elementOnFocus.style.backgroundColor = nordFocusRevealCS.options["hightlightColor"];
		setTimeout(function () {
			nordFocusRevealCS.elementOnFocus.style.backgroundColor = oldbackground;
		}, 250);
	}, // End of showHighlight
	
}

var listener = function (message, sender, sendResponse) {
	if (nordFocusRevealCS.dbug) console.log ("Listening with dbug: " + nordFocusRevealCS.dbug + ".");
	
	if (nordFocusRevealCS.dbug) console.log ("Before starting the scan..." + message["task"] + ", options: " + message["options"]  + ".");
	if (message["task"] == "reveal") {
		nordFocusRevealCS.options = message["options"];
		nordFocusRevealCS.dbug = nordFocusRevealCS.options["consoleDebug"];
		nordFocusRevealCS.run();
	}
};

browser.runtime.onMessage.addListener(listener);
