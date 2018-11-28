//HTML elements
var highLight_color = document.getElementById("highLight_color");
var show_highLight = document.getElementById("show_highLight");

//Save options
function SaveOptions(e) {
    e.preventDefault();
    isCheckedHighLight();
    browser.storage.local.set({
        HightlightColor: highLight_color.value,
        ShowHighlight: show_highLight.value,
    });
    alert("Options saved successfully");
}

//Restore options
function RestoreOptions(eventThatHappened) {
    eventThatHappened.preventDefault();
    function setCurrentChoice(result) {
        highLight_color.value = result.HightlightColor
        var getting = browser.storage.local.get("ShowHighlight");
        getting.then(setCurrentChoice2);
    }
    function setCurrentChoice2(result) {
        if (result.ShowHighlight == "checked") {
            show_highLight.checked = true;
        } else {
            show_highLight.checked = false;
        }
        check()
    }
    var getting = browser.storage.local.get("HightlightColor");
    getting.then(setCurrentChoice);
}

//Check and uncheck
function isCheckedHighLight() {
    if (show_highLight.checked) {
        show_highLight.value = "checked";
    } else {
        show_highLight.value = "unchecked";
    }
}
document.onchange = function () {
    if (show_highLight.checked) {
        highLight_color.removeAttribute("disabled");
    } else {
        highLight_color.setAttribute("disabled", "true");
    }
}

function check() {
    if (show_highLight.checked) {
        highLight_color.removeAttribute("disabled");
    } else {
        highLight_color.setAttribute("disabled", "true");
    }
}
document.addEventListener("DOMContentLoaded", RestoreOptions);
document.getElementById("form").addEventListener("submit", SaveOptions);