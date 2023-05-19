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
		"msgArea":null
	},
	inputs : {
		"consoleOutputChk":null,
		"consoleDebugChk":null,
		"consoleAlertChk":null,
		"showBorderChk":null,
		"borderColorTxt":null,
		"borderSolidRdo":null,
		"borderDashedRdo":null,
		"borderDottedRdo":null,
		"showHighlightChk":null,
		"highlightColorTxt":null
	},
	parts : ["console", "border", "highlight", "about"],
	init : function () {
		
		for (el in nordFocusRevealOpts.els) {
			nordFocusRevealOpts.els[el] = document.getElementById(el);
		}
		for (ins in nordFocusRevealOpts.inputs) {
			nordFocusRevealOpts.inputs[ins] = document.getElementById(ins);
		}
		nordFocusRevealOpts.els["saveBtn"].addEventListener("click", 
			function () {
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
		setTimeout(function() {
			nordFocusRevealOpts.els["msgArea"].classList.add("hide");
			nordFocusRevealOpts.els["msgArea"].classList.remove("toast");
			nordFocusRevealOpts.els["msgArea"].textContent = "";
			}, 5000);
	}, // End of savedSuccess
	fillInputs : function () {
		// Console
		nordFocusRevealOpts.inputs["consoleOutputChk"].checked = nordFocusReveal.options["consoleOutput"];
		nordFocusRevealOpts.inputs["consoleDebugChk"].checked = nordFocusReveal.options["consoleDebug"];
		nordFocusRevealOpts.inputs["consoleAlertChk"].checked = nordFocusReveal.options["consoleAlert"];

		// Border
		nordFocusRevealOpts.inputs["showBorderChk"].checked =  nordFocusReveal.options["showBorder"];
		nordFocusRevealOpts.inputs["borderColorTxt"].setAttribute("value", nordFocusReveal.options["borderColor"]);
		nordFocusRevealOpts.inputs["border" + nordFocusReveal.options["borderType"] + "Rdo"].checked = nordFocusReveal.options["borderColor"];

		// Highlight
		nordFocusRevealOpts.inputs["showHighlightChk"].checked = nordFocusReveal.options["showHighlight"];
		nordFocusRevealOpts.inputs["highlightColorTxt"].value = nordFocusReveal.options["hightlightColor"];

	}, // End of fillInputs
	gatherInputs : function() {
		// Console
		nordFocusReveal.options["consoleOutput"] = nordFocusRevealOpts.inputs["consoleOutputChk"].checked;
		nordFocusReveal.options["consoleDebug"] = nordFocusRevealOpts.inputs["consoleDebugChk"].checked;
		nordFocusReveal.options["consoleAlert"] = nordFocusRevealOpts.inputs["consoleAlertChk"].checked;

		// Border
		nordFocusReveal.options["showBorder"] = nordFocusRevealOpts.inputs["showBorderChk"].checked;
		nordFocusReveal.options["borderColor"] = nordFocusRevealOpts.inputs["borderColorTxt"].value;
		nordFocusReveal.options["borderType"] = (nordFocusRevealOpts.inputs["borderDottedRdo"].checked ? "Dotted" : (nordFocusRevealOpts.inputs["borderDashedRdo"].checked ? "Dashed" : "Solid")) ;

		// Highlight
		nordFocusReveal.options["showHighlight"] = nordFocusRevealOpts.inputs["showHighlightChk"].checked;
		nordFocusReveal.options["hightlightColor"] = nordFocusRevealOpts.inputs["highlightColorTxt"].value;
	}, // End of gatherInputs
	setupLinks : function () {
		for (let p in nordFocusRevealOpts.parts) {
			nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"A"].addEventListener("click", nordFocusRevealOpts.toggleSection, false);
		}
	}, // End of setupLinks
	toggleSection : function(e) {
		e.preventDefault();
		for (let p in nordFocusRevealOpts.parts) {
			if (e.target.getAttribute("id") == nordFocusRevealOpts.parts[p] +"A") {
				//console.log ("adding show to " + nordFocusRevealOpts.parts[p] +"Sec");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"Sec"].classList.remove("hide");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"Sec"].classList.add("show");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"A"].classList.add("active");
			} else {
				//console.log ("adding hide to " + nordFocusRevealOpts.parts[p] +"Sec");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"Sec"].classList.remove("show");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"Sec"].classList.add("hide");
				nordFocusRevealOpts.els[nordFocusRevealOpts.parts[p] +"A"].classList.remove("active");
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
