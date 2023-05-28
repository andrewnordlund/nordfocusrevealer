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
		"msgArea":null,
		"keyboardShortcutStr":null
	},
	inputs : {
		"consoleOutputChk":null,
		"consoleDebugChk":null,
		"consoleAlertChk":null,
		"elDescChk":null,
		"xpathChk":null,
		"showBorderChk":null,
		"borderColorTxt":null,
		"borderSolidRdo":null,
		"borderDashedRdo":null,
		"borderDottedRdo":null,
		"borderDurTxt":null,
		"showHighlightChk":null,
		"highlightColorTxt":null
	},
	parts : ["console", "border", "highlight", "about"],
	init : function () {
		nordFocusRevealOpts.dbug = nordFocusReveal.dbug;

		


		for (el in nordFocusRevealOpts.els) {
			nordFocusRevealOpts.els[el] = document.getElementById(el);
		}
		for (ins in nordFocusRevealOpts.inputs) {
			nordFocusRevealOpts.inputs[ins] = document.getElementById(ins);
		}
		nordFocusReveal.checkCommands(function (sck) {
				console.log ("Got sck: " + sck + ".");
			nordFocusRevealOpts.els["keyboardShortcutStr"].textContent = sck;
			});
		nordFocusRevealOpts.els["saveBtn"].addEventListener("click", 
			function () {
				if (nordFocusRevealOpts.dbug) console.log ("Gonna try Saving");
				nordFocusRevealOpts.gatherInputs();
				nordFocusReveal.saveOptions(nordFocusRevealOpts.savedSuccess, nordFocusReveal.errorFun);
			}, false);
		nordFocusRevealOpts.inputs["showHighlightChk"].addEventListener("change", nordFocusRevealOpts.toggleHighlightTxt, false);
		nordFocusRevealOpts.setupLinks();
		nordFocusRevealOpts.fillInputs();

		document.getElementById("slashonA").onclick = function () {browser.tabs.create({ url: "http://www.slashon.ca" });};
		document.getElementById("nordburgA").onclick = function () {browser.tabs.create({ url: "https://www.nordburg.ca" });};
	}, // End of init
		savedSuccess : function () {
		nordFocusRevealOpts.els["msgArea"].textContent = "Saved!";
		nordFocusRevealOpts.els["msgArea"].classList.add("toast");
		nordFocusRevealOpts.els["msgArea"].classList.remove("hide");
		nordFocusRevealOpts.fillInputs();
		setTimeout(function() {
			nordFocusRevealOpts.els["msgArea"].classList.add("hide");
			nordFocusRevealOpts.els["msgArea"].classList.remove("toast");
			nordFocusRevealOpts.els["msgArea"].textContent = "";
			}, 3000);
	}, // End of savedSuccess
	fillInputs : function () {
		// Console
		nordFocusRevealOpts.inputs["consoleOutputChk"].checked = nordFocusReveal.options["consoleOutput"];
		nordFocusRevealOpts.inputs["consoleDebugChk"].checked = nordFocusReveal.options["consoleDebug"];
		nordFocusRevealOpts.inputs["consoleAlertChk"].checked = nordFocusReveal.options["consoleAlert"];
		nordFocusRevealOpts.inputs["elDescChk"].checked = nordFocusReveal.options["showElDesc"];
		nordFocusRevealOpts.inputs["xpathChk"].checked = nordFocusReveal.options["showXpath"];

		// Border
		nordFocusRevealOpts.inputs["showBorderChk"].checked =  nordFocusReveal.options["showBorder"];
		nordFocusRevealOpts.inputs["borderColorTxt"].value = nordFocusReveal.options["borderColor"];
		nordFocusRevealOpts.inputs["border" + nordFocusReveal.options["borderType"] + "Rdo"].checked = nordFocusReveal.options["borderColor"];
		nordFocusRevealOpts.inputs["borderDurTxt"].value = nordFocusReveal.options["duration"];

		// Highlight
		nordFocusRevealOpts.inputs["showHighlightChk"].checked = nordFocusReveal.options["showHighlight"];
		if (nordFocusRevealOpts.inputs["showHighlightChk"].checked && nordFocusRevealOpts.inputs["highlightColorTxt"].hasAttribute("disabled")) nordFocusRevealOpts.inputs["highlightColorTxt"].removeAttribute("disabled");
		nordFocusRevealOpts.inputs["highlightColorTxt"].value = nordFocusReveal.options["hightlightColor"];
	}, // End of fillInputs
	gatherInputs : function() {
		const digOnlyRE = /\D/g;
		// Console
		nordFocusReveal.options["consoleOutput"] = nordFocusRevealOpts.inputs["consoleOutputChk"].checked;
		nordFocusReveal.options["consoleDebug"] = nordFocusRevealOpts.inputs["consoleDebugChk"].checked;
		nordFocusReveal.options["consoleAlert"] = nordFocusRevealOpts.inputs["consoleAlertChk"].checked;
		nordFocusReveal.options["showElDesc"] = nordFocusRevealOpts.inputs["elDescChk"].checked;
		nordFocusReveal.options["showXpath"] = nordFocusRevealOpts.inputs["xpathChk"].checked;

		// Border
		nordFocusReveal.options["showBorder"] = nordFocusRevealOpts.inputs["showBorderChk"].checked;
		if (nordFocusRevealOpts.sanitizeColour(nordFocusRevealOpts.inputs["borderColorTxt"].value)) nordFocusReveal.options["borderColor"] = nordFocusRevealOpts.inputs["borderColorTxt"].value;

		nordFocusReveal.options["borderType"] = (nordFocusRevealOpts.inputs["borderDottedRdo"].checked ? "Dotted" : (nordFocusRevealOpts.inputs["borderDashedRdo"].checked ? "Dashed" : "Solid"));
		let durVal = nordFocusRevealOpts.inputs["borderDurTxt"].value.replaceAll(digOnlyRE, "").trim();
		if (durVal.match(/^\d+$/)) {
			nordFocusReveal.options["duration"] = (parseInt(durVal) > parseInt(nordFocusReveal["maxDuration"]) ? nordFocusReveal["maxDuration"] : durVal);
		}

		// Highlight
		nordFocusReveal.options["showHighlight"] = nordFocusRevealOpts.inputs["showHighlightChk"].checked;
		if (nordFocusRevealOpts.sanitizeColour(nordFocusRevealOpts.inputs["highlightColorTxt"].value)) nordFocusReveal.options["hightlightColor"] = nordFocusRevealOpts.inputs["highlightColorTxt"].value;
	}, // End of gatherInputs
	sanitizeColour : function (c) {
		// Modified from from https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color
		//  Uh oh.  This isn't working for things like #303030.  Gotta convert to rgb(\d, \d, \d)
		// If needs be, other stuff can be stolen from here:  https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
		
		if (nordFocusRevealOpts.dbug) console.log ("sanitizeColour::Is " + c + " a valid colour?");
		let s = new Option().style;
		s.color = c;

		// return 'false' if color wasn't assigned
		let rv = !(s.color === "")
		if (nordFocusRevealOpts.dbug) console.log ("sanitizeColour: " + s.color +", so rv is " + rv + ".");
		return rv;
	}, // End of sanitizeColour      
	setupLinks : function () {
		for (let p in nordFocusRevealOpts.parts) {
			nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"A"].addEventListener("click", nordFocusRevealOpts.toggleSection, false);
		}
	}, // End of setupLinks
	toggleSection : function(e) {
		e.preventDefault();
		for (let p in nordFocusRevealOpts.parts) {
			if (e.target.getAttribute("id") == nordFocusRevealOpts.parts[p] +"A") {
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"Sec"].classList.remove("hide");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"Sec"].classList.add("show");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"A"].classList.add("active");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"A"].setAttribute("aria-current", "page");
			} else {
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"Sec"].classList.remove("show");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"Sec"].classList.add("hide");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"A"].classList.remove("active");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"A"].removeAttribute("aria-current");
			}
		}
	}, // End of toggleSection
	toggleHighlightTxt : function () {
		if (nordFocusRevealOpts.inputs["highlightColorTxt"].hasAttribute("disabled")) {
			nordFocusRevealOpts.inputs["highlightColorTxt"].removeAttribute("disabled");
		} else {
			nordFocusRevealOpts.inputs["highlightColorTxt"].setAttribute("disabled", "disabled");
		}
	}
}

if (nordFocusRevealOpts.dbug) console.log ("nordFocusReveal.js loaded");

nordFocusReveal.loadOptions(nordFocusRevealOpts.init, nordFocusReveal.errorFun);
