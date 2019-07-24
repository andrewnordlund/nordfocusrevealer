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

		// Only bother getting the node text and name/id of the active element if you're going to display it somehow
		if (nordFocusRevealCS.options["consoleOutput"] == true || nordFocusRevealCS.options["consoleAlert"] == true) {
			var nodeText = "";
			nodeText = nordFocusRevealCS.getNodeText(nordFocusRevealCS.elementOnFocus);
			if (nodeText && (nodeText == "" || nodeText == "not defined")) {
				nodeText = "";
			} else {
				var maxLength = 115;	// This could be an option or two at some point
				if (nodeText.length > maxLength) {
					nodeText = nodeText.substring(0, 100) + "..." + nodeText.substring(nodeText.length-10, nodeText.length-1);
				}
				nodeText = " - \"" + nodeText + "\"";
			}

			if (nordFocusRevealCS.dbug) console.log("Got the focused item.  Now to reveal it to all.");

			var output = "Element: " + nordFocusRevealCS.elementOnFocus.toString() + " (" + (nordFocusRevealCS.elementOnFocus.hasAttribute("id") ? nordFocusRevealCS.elementOnFocus.nodeName + "#" + nordFocusRevealCS.elementOnFocus.getAttribute("id") : nordFocusRevealCS.getParentWithID(nordFocusRevealCS.elementOnFocus)) + ")" + nodeText + " has focus.";
			if (nordFocusRevealCS.dbug) {
				var log = [];
				for (let k in nordFocusRevealCS.options) log.push(k + ": " + nordFocusRevealCS.options[k]);
				console.log (log.join(", "));
			}

			if (nordFocusRevealCS.dbug) console.log("consoleOutput: " + nordFocusRevealCS.options["consoleOutput"] + ".");
			if (nordFocusRevealCS.options["consoleOutput"] == true) console.log (output);
			if (nordFocusRevealCS.options["consoleAlert"] == true) alert (output);
		}
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
	getParentWithID : function (n) {
		var pn = n.parentNode;
		var returnValue = "";
		 if (pn.hasAttribute("id")) {
			returnValue = pn.nodeName + "#" + pn.getAttribute("id") + " > " + n.nodeName;
		} else if (pn.hasAttribute("name")) {
			returnValue = pn.nodeName + ":name: " + pn.hasAttribute("name") + " > " + n.nodeName;
		} else if (n.nodeName.match(/body/i)) {
			returnValue = "body";
		} else if (pn.nodeName.match(/body/i)) {
			returnValue = "body" + " > " + n.nodeName;
		} else {
			returnValue = nordFocusRevealCS.getParentWithID(pn) + "> " + n.nodeName;
		}
		return returnValue;
	}, // End of getParentWithID
	getNodeText : function(n) {
		var returnValue = "";
		if (n == "undefined") {
			returnValue = "not defined";
		} else {
			for (var i=0; i < n.childNodes.length; i++) {
				if (n.childNodes[i].nodeType == 3) {
					returnValue += n.childNodes[i].nodeValue;
				} else if (n.childNodes[i].nodeType == 1) {
					returnValue += nordFocusRevealCS.getNodeText(n.childNodes[i]);
				}
			}
		}
		return returnValue;
	}, // End of getNodeText
	
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
