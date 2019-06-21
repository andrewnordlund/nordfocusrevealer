if (typeof (nordFocusReveal) == "undefined") {
	var nordFocusReveal = {};
}
nordFocusReveal = {
	dbug : false,
	loaded : false,
	postLoad : [],
	options : {
		"OutputToConsole" : true,
		"ConsoleDebug" : false,
		"DisplayAlerts" : false,

		"ShowBorder" : true,
		"BorderColor" : "red",
		"BorderType" : "solid",

		"ShowHighlight" : false,
		"HightlightColor" : "gray"
		"dbug": nordFocusReveal.dbug,
	},
	init : function () {
		// Something may need to go here at some point
	}, // End of init
	initGenderCounts : function () {
	}, // End of initGenderCounts
	loadOptions : function (success, failure) {
		if (nordFocusReveal.dbug) console.log ("Loading Options.");
		
		var getting = browser.storage.local.get("options");
		getting.then(function (savedObj) {
			
			if (nordFocusReveal.dbug) console.log ("Got stored options.");

			if (nordburg.countObjs(savedObj) == 0) {
				if (nordFocusReveal.dbug) console.log ("There ain't nothing there.");
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
		var saving = browser.storage.local.set({"options":nordFocusReveal.options});
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
