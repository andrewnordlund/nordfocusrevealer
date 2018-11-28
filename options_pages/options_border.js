//HTML elements
var border_color = document.getElementById("border_color");
var show_border = document.getElementById("show_border");
var border_solid = document.getElementById("border_solid");
var border_dashed = document.getElementById("border_dashed");
var border_dotted = document.getElementById("border_dotted");

//Save options
function SaveOptions(e) {
    e.preventDefault();
    isCheckedBorder();
    isCheckedBorderSolid();
    isCheckedBorderDashed();
    isCheckedBorderDotted();
    defineBorderType();
    browser.storage.local.set({
        BorderColor: border_color.value,
        ShowBorder: show_border.value,
    });
    alert("Options saved successfully");
}

//Restore options
function RestoreOptions(eventThatHappened) {
    eventThatHappened.preventDefault();
    function setCurrentChoice(result) {
        border_color.value = result.BorderColor
        var getting = browser.storage.local.get("ShowBorder");
        getting.then(setCurrentChoice2);
    }
    function setCurrentChoice2(result) {
        if (result.ShowBorder == "checked") {
            show_border.checked = true;
        } else {
            show_border.checked = false;
        }
        var getting = browser.storage.local.get("BorderType");
        getting.then(setCurrentChoice4);
    }
    function setCurrentChoice4(result) {
        if (result.BorderType == "solid") {
            border_solid.checked = true;
        } else {
            border_solid.checked = false;
        }
        if (result.BorderType == "dashed") {
            border_dashed.checked = true;
        } else {
            border_dashed.checked = false;
        }
        if (result.BorderType == "dotted") {
            border_dotted.checked = true;
        } else {
            border_dotted.checked = false;
        }
        check()
    }
    var getting = browser.storage.local.get("BorderColor");
    getting.then(setCurrentChoice);
}

//Check and uncheck
function isCheckedBorder (){
    if (show_border.checked) {
        show_border.value = "checked";
    } else {
        show_border.value = "unchecked";
    }
}
function isCheckedBorderSolid() {
    if (border_solid.checked) {
        border_solid.value = "checked";
    } else {
        border_solid.value = "unchecked";
    }
}
function isCheckedBorderDashed() {
    if (border_dashed.checked) {
        border_dashed.value = "checked";
    } else {
        border_dashed.value = "unchecked";
    }
}
function isCheckedBorderDotted() {
    if (border_dotted.checked) {
        border_dotted.value = "checked";
    } else {
        border_dotted.value = "unchecked";
    }
}

// Return border type
function defineBorderType() {
    if (border_solid.value == "checked") {
        browser.storage.local.set({ BorderType: "solid" });
    }
    if (border_dashed.value == "checked") {
        browser.storage.local.set({ BorderType: "dashed" });
    }
    if (border_dotted.value == "checked") {
        browser.storage.local.set({ BorderType: "dotted" });
    }
}
document.onchange = function () {
    if (show_border.checked) {
        border_color.removeAttribute("disabled");
        border_solid.removeAttribute("disabled");
        border_dashed.removeAttribute("disabled");
        border_dotted.removeAttribute("disabled");
    } else {
        border_color.setAttribute("disabled", "true");
        border_solid.setAttribute("disabled", "true");
        border_dashed.setAttribute("disabled", "true");
        border_dotted.setAttribute("disabled", "true");
    }
}

function check() {
    if (show_border.checked) {
        border_color.removeAttribute("disabled");
        border_solid.removeAttribute("disabled");
        border_dashed.removeAttribute("disabled");
        border_dotted.removeAttribute("disabled");
    } else {
        border_color.setAttribute("disabled", "true");
        border_solid.setAttribute("disabled", "true");
        border_dashed.setAttribute("disabled", "true");
        border_dotted.setAttribute("disabled", "true");
    }
}
document.addEventListener("DOMContentLoaded", RestoreOptions);
document.getElementById("form").addEventListener("submit", SaveOptions);