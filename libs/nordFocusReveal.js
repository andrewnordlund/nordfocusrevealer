if (typeof (nordFocusReveal) == "undefined") {
	var nordFocusReveal = {};
}
nordFocusReveal = {
	dbug : true,
	loaded : false,
	postLoad : [],
	options : {
		"consoleOutput":false,
		"consoleDebug":false,
		"consoleAlert":false,
		
		"showBorder" : true,
		"borderColor" : "red",
		"borderType" : "Solid",

		"showHighlight" : false,
		"hightlightColor" : "gray",
		"dbug": nordFocusReveal.dbug,
	},
	init : function () {
		// Something may need to go here at some point
	}, // End of init
	countObjs : function (obj) {

	}, // End of initGenderCounts
	loadOptions : function (success, failure) {
		if (nordFocusReveal.dbug) console.log ("Loading Options.");
		
		var getting = browser.storage.local.get("options");
		getting.then(function (savedObj) {
			
			if (nordFocusReveal.dbug) console.log ("Got stored options.");

			
			if (Object.keys(savedObj).length === 0 && savedObj.constructor === Object) {
				if (nordFocusReveal.dbug) console.log ("There ain't nothing there.  Checking for old values.");
				// Check for old values
				var gettingOld = browser.storage.local.get({"OutputToConsole":false, "ConsoleDebug":false, "DisplayAlerts":false, "ShowBorder":true, "BorderColor":"red", "BorderType":"Solid", "ShowHighlight":false, "HightlightColor":"gray"});
				gettingOld.then(function (savedObj) {
					nordFocusReveal.options["consoleOutput"] = savedObj["OutputToConsole"];
					nordFocusReveal.options["consoleDebug"] = savedObj["ConsoleDebug"];
					nordFocusReveal.options["consoleAlert"] = savedObj["DisplayAlerts"];
					nordFocusReveal.options["showBorder"] = savedObj["ShowBorder"];
					nordFocusReveal.options["borderColor"] = savedObj["BorderColor"];
					nordFocusReveal.options["borderType"] = savedObj["BorderType"];
					nordFocusReveal.options["showHighlight"] = savedObj["ShowHighlight"];
					nordFocusReveal.options["highlightColor"] = savedObj["HightlightColor"];
					
					nordFocusReveal.saveOptions(function() {
						browser.storage.local.remove(["OutputToConsole", "ConsoleDebug", "DisplayAlerts", "ShowBorder", "BorderColor", "BorderType", "ShowHighlight", "HightlightColor"]).then(function() {
							//nordFocusReveal.dbug = 
						}, nordFocusReveal.errorFun);
					}, nordFocusReveal.errorFun);
				}, nordFocusReveal.errorFun);
			} else {
				if (nordFocusReveal.dbug) console.log ("Got saved options.");
				if (savedObj.hasOwnProperty("options")) savedObj = savedObj["options"];
				if (nordFocusReveal.dbug) {
					console.log ("Something there.");
					console.log ("typeof(savedObj): " + typeof(savedObj) + ".");
					console.log ("savedObj: " + savedObj + ".");
					//for (var k in savedObj) {
					//	console.log (k);
					//}
				}
				for (var opt in nordFocusReveal.options) {
					if (savedObj.hasOwnProperty(opt)) {
						nordFocusReveal.options[opt] = savedObj[opt];
						if (opt == "dbug") {
							nordFocusReveal.dbug = nordFocusReveal.options[opt];
							//nordburg.dbug = nordFocusReveal.dbug;
							//console.log ("Setting nord(burg|FocusReveal).dbug to " + nordFocusReveal.dbug + " because opt[dbug] = " + savedObj[opt] + ".");
						}
					}
				}

			}

			//if (nordFocusReveal.dbug) console.log ("Badge is now " + nordFocusReveal.options["badge"] + ".");
			nordFocusReveal.setLoaded();
			if (success) success();
		}, failure);
	}, // End of loadOptions
	saveOptions : function (success, failure) {
		if (nordFocusReveal.dbug) {
			for (let k in nordFocusReveal.options) {
				console.log (`${k}: ${nordFocusReveal.options[k]}.`);
			}
		}
		var saving = browser.storage.local.set({"options":nordFocusReveal.options});
		saving.then(success, failure);
	}, // End of saveOptions
	setLoaded : function () {
		nordFocusReveal.loaded = true;
		nordFocusReveal.afterLoad();
	}, // End of setLoaded
	afterLoad : function () {
		for (var i = 0; i < nordFocusReveal.postLoad.length; i++) {
			nordFocusReveal.postLoad[i]();
		}
	}, // End of afterLoad
	addToPostLoad : function (funcs) {
		nordFocusReveal.postLoad = Object.assign(nordFocusReveal.postLoad, funcs);
		if (nordFocusReveal.loaded) {
			nordFocusReveal.afterLoad();
		}
	}, // End of afterLoad
	
	errorFun : function (e) {
		console.error ("Error! " + e);
	}, // End of errorFun
}
if (nordFocusReveal.dbug) console.log ("nordFocusReveal.js loaded");

nordFocusReveal.loadOptions(nordFocusReveal.init, nordFocusReveal.errorFun);
