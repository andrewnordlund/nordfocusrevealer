//HTML elements
var console_output = document.getElementById("console_output");
var console_debug = document.getElementById("console_debug");
var console_alert = document.getElementById("console_alert");

//Save options
function SaveOptions(e) {
	e.preventDefault();
	nordFocusReveal.options["outputToConsole"] = (console_output.value == "checked" ? true : false);
	nordFocusReveal.options["ConsoleDebug"] = (console_debug.value == "checked" ? true : false);
	nordFocusReveal.options["DisplayAlerts"] = (console_alert.value == "checked" ? true : false);

	nordFocusReveal.saveOptions(null, nordFocusReveal.errorFun);
	/*
    isCheckedConsole();
    isCheckedDebug();
    isCheckedAlerts();
    browser.storage.local.set({
        OutputToConsole: console_output.value,
        ConsoleDebug: console_debug.value,
        DisplayAlerts: console_alert.value
    });

    alert("Options saved successfully");
    */
}

//Restore settings
function RestoreOptions(eventThatHappened) {
	console_output.checked = nordFocusReveal.options["outputToConsole"];
	console_debug.checked = nordFocusReveal.options["ConsoleDebug"];
	console_arert.checked = nordFocusReveal.options["DisplayAlerts"];
	/*
    eventThatHappened.preventDefault();
    function setCurrentChoice(result) {
        if (result.ConsoleDebug == "checked") {
            console_debug.checked = true;
        } else {
            console_debug.checked = false;
        }
        var getting = browser.storage.local.get("OutputToConsole");
        getting.then(setCurrentChoice2);
    }
    function setCurrentChoice2(result) {
        if (result.OutputToConsole == "checked") {
            console_output.checked = true;
        } else {
            console_output.checked = false;
        }
        var getting = browser.storage.local.get("DisplayAlerts");
        getting.then(setCurrentChoice4);
    }
    function setCurrentChoice4(result) {
        if (result.DisplayAlerts == "checked") {
            console_alert.checked = true;
        } else {
            console_alert.checked = false;
        }
        check();
    }
    var getting = browser.storage.local.get("ConsoleDebug");
    getting.then(setCurrentChoice);
    */
}

//Check and uncheck
/*
function isCheckedConsole() {
    if (console_output.checked) {
        console_output.value = "checked";
    } else {
        console_output.value = "unchecked";
    }
}
function isCheckedDebug() {
    if (console_debug.checked) {
        console_debug.value = "checked";
    } else {
        console_debug.value = "unchecked";
    }
}
function isCheckedAlerts() {
    if (console_alert.checked) {
        console_alert.value = "checked";
    } else {
        console_alert.value = "unchecked";
    }
}

function check() {
    if (console_output.checked) {
        console_debug.removeAttribute("disabled");
    } else {
        console_debug.setAttribute("disabled", "true");
    }
}
document.onchange = function () {
    if (console_output.checked) {
        console_debug.removeAttribute("disabled");
    } else {
        console_debug.setAttribute("disabled", "true");
    }
};
*/
// Fade out animation
// WCAG Violation here.  
/*
var opacity = 1;
var elem = document.getElementById("text");
var interval = setInterval(fadeOut, 30);
function fadeOut() {
    if (opacity > 0) {
        opacity -= 0.01;
        elem.style.opacity = opacity;
    }
    if (opacity <= 0) {
        clearInterval(interval);
        elem.parentNode.removeChild(elem);
    }
}
*/
document.addEventListener("DOMContentLoaded", RestoreOptions);
