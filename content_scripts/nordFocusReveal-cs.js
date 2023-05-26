if (typeof (nordFocusRevealCS) == "undefined") {
	var nordFocusRevealCS = {};
}

nordFocusRevealCS = {
	dbug : false,
	elementOnFocus : null,
	elementOnFocusStyle : null,
	options : {
		"consoleOutput":false,
		"consoleDebug":false,
		"consoleAlert":false,
		"showElDesc":true,
		"showXpath":true,
		
		"showBorder" : true,
		"borderColor" : "red",
		"borderType" : "Solid",

		"showHighlight" : false,
		"hightlightColor" : "gray",
		
		"duration" : 250,
	},
	run : function () {
		nordFocusRevealCS.elementOnFocus = null;
		nordFocusRevealCS.getFocusedItem();
		//if (nordFocusRevealCS.elementOnFocus.nodeName.toLowerCase() == "iframe") {
			//if (nordFocusRevealCS.dbug)console.log ("It's on an iFrame, so getting outta here.");
			//console.log ("Element: " + nordFocusRevealCS.getXPathForElement(nordFocusRevealCS.elementOnFocus, document));

		//} else {
			//console.log ("elementOnFocus: " + nordFocusRevealCS.elementOnFocus.nodeName + ".");
			//console.log ("elementOnFocus.toString(): " + nordFocusRevealCS.elementOnFocus.toString() + ".");
		//}
		// Only bother getting the node text and name/id of the active element if you're going to display it somehow
		if (nordFocusRevealCS.options["consoleOutput"] == true || nordFocusRevealCS.options["consoleAlert"] == true) {
			var nodeText = "";
			nodeText += nordFocusRevealCS.getNodeText(nordFocusRevealCS.elementOnFocus);
			if (nodeText && (nodeText == "" || nodeText == "not defined")) {
				nodeText = "";
			} else {
				var maxLength = 115;	// This could be an option or two at some point
				nodeText = nodeText.replaceAll("/[ \s\t][ \s\t]+/", " ");
				nodeText = nodeText.replaceAll("/^[ \s\t]*$", "");
				nodeText = nodeText.replaceAll("/\n\n+/", "\n");
				if (nodeText.length > maxLength) {
					nodeText = nodeText.substring(0, 100) + "..." + nodeText.substring(nodeText.length-10, nodeText.length-1);
				}
				nodeText = " - \"" + nodeText + "\"";
			}

			if (nordFocusRevealCS.dbug) console.log("Got the focused item.  Now to reveal it to all.");

			let output = "";
			if (nordFocusRevealCS.options["showElDesc"]) {
				output += "Element: " + nordFocusRevealCS.elementOnFocus.toString() + " (" + (nordFocusRevealCS.elementOnFocus.hasAttribute("id") ? nordFocusRevealCS.elementOnFocus.nodeName + "#" + nordFocusRevealCS.elementOnFocus.getAttribute("id") : nordFocusRevealCS.getParentWithID(nordFocusRevealCS.elementOnFocus)) + " class=\"" + nordFocusRevealCS.elementOnFocus.className + "\" " + ")" + nodeText + " has focus.";
				if (nordFocusRevealCS.options["showXpath"]) output += "\n";
			}
			if (nordFocusRevealCS.options["showXpath"]) output += "Xpath: " + nordFocusRevealCS.getXPathForElement(nordFocusRevealCS.elementOnFocus, document);

			
			if (nordFocusRevealCS.dbug) {
				var log = [];
				for (let k in nordFocusRevealCS.options) log.push(k + ": " + nordFocusRevealCS.options[k]);
				console.log (log.join(", "));
			}

			if (nordFocusRevealCS.dbug) console.log("consoleOutput: " + nordFocusRevealCS.options["consoleOutput"] + ".");
			if (nordFocusRevealCS.options["consoleOutput"] == true && output != "") console.log (output);
			if (nordFocusRevealCS.options["consoleAlert"] == true & output != "") alert (output);
		}
		if (nordFocusRevealCS.options["showBorder"] == true) nordFocusRevealCS.showBorder();
		
		if (nordFocusRevealCS.options["showHighlight"] == true) nordFocusRevealCS.showHighlight();

	}, // End of getFocusItem
	getFocusedItem: function () {
        	if (nordFocusRevealCS.dbug) console.log("Getting focused item");
	        nordFocusRevealCS.elementOnFocus = document.activeElement;
		nordFocusRevealCS.elementOnFocusStyle  = nordFocusRevealCS.elementOnFocus.getAttribute("style");
        	if (nordFocusRevealCS.dbug) console.log("Got focused item");
        	if (nordFocusRevealCS.dbug) console.log("Focused item: " + nordFocusRevealCS.elementOnFocus + ".");
		if (nordFocusRevealCS.dbug) console.log ("Old style: " + nordFocusRevealCS.elementOnFocusStyle + ".");
	}, // End of getFocusItem
	
	showBorder : function () {
		nordFocusRevealCS.elementOnFocus.style.border = "8px " + nordFocusRevealCS.options["borderType"] + " " + nordFocusRevealCS.options["borderColor"];
	        setTimeout(nordFocusRevealCS.resetStyle, parseInt(nordFocusRevealCS.options["duration"]));
	}, // End of showBorder
	showHighlight : function () {
		nordFocusRevealCS.elementOnFocus.style.backgroundColor = nordFocusRevealCS.options["hightlightColor"];
		setTimeout(nordFocusRevealCS.resetStyle, parseInt(nordFocusRevealCS.options["duration"]));
	}, // End of showHighlight
	resetStyle : function () {
		if (nordFocusRevealCS.elementOnFocusStyle) {
			nordFocusRevealCS.elementOnFocus.setAttribute("style", nordFocusRevealCS.elementOnFocusStyle);
		} else {
			nordFocusRevealCS.elementOnFocus.removeAttribute("style");
		}
	}, // End of resetStyle
	getParentWithID : function (n) {
		var pn = n.parentNode;
		var returnValue = "";
		 if (pn.hasAttribute("id")) {
			returnValue = pn.nodeName + "#" + pn.getAttribute("id") + " > " + n.nodeName;
		} else if (pn.hasAttribute("name")) {
			returnValue = pn.nodeName + ":name: " + pn.hasAttribute("name") + " > " + n.nodeName;
		} else if (n.nodeName.match(/^body$/i)) {
			returnValue = "body";
		} else if (pn.nodeName.match(/^body$/i)) {
			returnValue = "body" + " > " + n.nodeName;
		} else {
			returnValue = nordFocusRevealCS.getParentWithID(pn) + " > " + n.nodeName;
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
	getXPathForElement : function (el, xml) {
		// Stolen shamelessly from https://developer.mozilla.org/en-US/docs/Web/XPath/Snippets

		// If we know that we're in an iFrame, can we access the parentNode and find out which iFrame we're in
		// And prepend that onto the XPath element?
		let xpath = "";
		let pos, tempitem2;

		while (el !== xml.documentElement) {
			pos = 0;
			tempitem2 = el;
			while (tempitem2) {
				if (tempitem2.nodeType === 1 && tempitem2.nodeName === el.nodeName) {
					// If it is ELEMENT_NODE of the same name
					pos += 1;
				}
				tempitem2 = tempitem2.previousSibling;
			}

			xpath = /*`*[name()='${el.nodeName}' and namespace-uri()='${el.namespaceURI ?? ""}']*/`${el.nodeName}[${pos}]/${xpath}`;
			el = el.parentNode;
		}
		//xpath = /*`/*[name()='${xml.documentElement.nodeName}' and namespace-uri()='${el.namespaceURI ?? ""}']/*/`${xml.documentElement.nodeName}${xpath}`;
		xpath = xpath.replace(/\/$/, "");
		return xpath.toLowerCase();
	} // End of getXPathForElement
	
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
