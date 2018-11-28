//Public variables
var elementOnFocus;
var consoleOptions;
var borderOptions;
var highlightOptions;
var newUser;

nordFocusReveal = { //What happens when execution
    getFocusItem: function () {
        if (consoleOptions.debug == true) console.log("2 - Getting focus item");
        elementOnFocus = document.activeElement;
        loadMemory();
    }
};

//Resets the options
function resetSettings() {
    consoleOptions = {
        show: true,
        debug: false,
        alert: false
    }
    borderOptions = {
        show: true,
        color: "red",
        type: "solid"
    }
    highlightOptions = {
        show: false,
        color: "gray"
    }
    if (consoleOptions.debug == true) console.log("Settings reset.");
}

//Apply settings
function loadMemory() {
    if (consoleOptions.debug == true) console.log("3 - Applying settings.");

    //Assign local storage content to settings
        //Console settings
    function applyOutputToConsole(e) {
        consoleOptions.show = e.OutputToConsole;
        if (consoleOptions.debug == true) console.log(" -> 1. OutputToConsole");
        var getting = browser.storage.local.get("ConsoleDebug");
        getting.then(applyConsoledebug);
    }
    function applyConsoledebug(e) {
        consoleOptions.debug = e.ConsoleDebug;
        if (consoleOptions.debug == true) console.log(" -> 2. Consoledebug");
        var getting = browser.storage.local.get("DisplayAlerts");
        getting.then(applyDisplayAlerts);
    }
    function applyDisplayAlerts(e) {
        consoleOptions.alert = e.DisplayAlerts;
        if (consoleOptions.debug == true) console.log(" -> 4. DisplayAlerts");
        var getting = browser.storage.local.get("ShowBorder");
        getting.then(applyShowBorder);
    }
        //Border settings
    function applyShowBorder(e) {
        borderOptions.show = e.ShowBorder;
        if (consoleOptions.debug == true) console.log(" -> 5. ShowBorder");
        var getting = browser.storage.local.get("BorderColor");
        getting.then(applyBorderColor);
    }
    function applyBorderColor(e) {
        borderOptions.color = e.BorderColor;
        if (consoleOptions.debug == true) console.log(" -> 7. BorderColor");
        var getting = browser.storage.local.get("BorderType");
        getting.then(applyBorderType);
    }
    function applyBorderType(e) {
        borderOptions.type = e.BorderType;
        if (consoleOptions.debug == true) console.log(" -> 8. BorderType");
        var getting = browser.storage.local.get("ShowHighlight");
        getting.then(applyShowHighlight);
    }
        //Highlight settings
    function applyShowHighlight(e) {
        highlightOptions.show = e.ShowHighlight;
        if (consoleOptions.debug == true) console.log(" -> 9. ShowHighlight");
        var getting = browser.storage.local.get("HightlightColor");
        getting.then(applyHightlightColor);
    }
    function applyHightlightColor(e) {
        highlightOptions.color = e.HightlightColor;
        if (consoleOptions.debug == true) console.log(" -> 11. HightlightColor");
        convert();
    }

    //Get from browser's local storage
    var getting = browser.storage.local.get("OutputToConsole");
    getting.then(applyOutputToConsole);
}

function convert() {

    //Console
    if (consoleOptions.show == "checked") consoleOptions.show = true;
    if (consoleOptions.show != true) consoleOptions.debug = false;
    if (consoleOptions.debug == "checked") consoleOptions.debug = true;
    if (consoleOptions.alert == "checked") consoleOptions.alert = true;

    //Border
    if (borderOptions.show == "checked") borderOptions.show = true;

    //HighLight
    if (highlightOptions.show == "checked") highlightOptions.show = true;
    execute();
}

//Execute the extention with settings
function execute() {
    if (consoleOptions.debug == true) console.log("4 - Executing settings.");

    //Console page
    if (consoleOptions.show == true) {
        if (consoleOptions.debug == true) {
            browser.runtime.sendMessage({ "element": elementOnFocus.toString(), "id": elementOnFocus.getAttribute("id") });
        } else {
            browser.runtime.sendMessage({ "element": elementOnFocus.toString(), "id": elementOnFocus.getAttribute("id") });
        }
    } else {
        consoleOptions.debug = false;
    }
    if (consoleOptions.alert == true) {
        if (consoleOptions.debug == true) console.log(" -> Display alerts");
        alert("element " + elementOnFocus.toString() + " id " + elementOnFocus.getAttribute("id"));
    }

    //Border page
    if (borderOptions.show == true) {
        if (consoleOptions.debug == true) console.log(" -> ShowBorder");
        elementOnFocus.style.border = "8px " + borderOptions.type + " " + borderOptions.color;
        setTimeout(function () {
            elementOnFocus.style.border = null;
        }, 250);
    }

    //Highlight page
    if (highlightOptions.show == true) {
        if (consoleOptions.debug == true) console.log(" -> ShowHighlight");
        elementOnFocus.style.backgroundColor = highlightOptions.color;
        setTimeout(function () {
            elementOnFocus.style.backgroundColor = null;
        }, 250);
    }

    //Clean page after putting style
    setTimeout(function () {
        if (elementOnFocus.getAttribute("style") == "") {
            elementOnFocus.removeAttribute("style");
            if (consoleOptions.debug == true) console.log("5 -'style' element removed.");
        }
    }, 250);
}
resetSettings();
var gettingUser = browser.storage.local.get("isNewUser");
gettingUser.then(checkUser);

function checkUser(e) {
    newUser = e.isNewUser;

    if (newUser == undefined) {
        browser.storage.local.set({
            OutputToConsole: true,
            ConsoleDebug: false,
            DisplayAlerts: false,

            ShowBorder: true,
            BorderColor: "red",
            BorderType: "solid",

            ShowHighlight: false,
            HightlightColor: "gray"
        });
        browser.storage.local.set({ isNewUser: false })
    }
    loadMemory()
}
browser.runtime.onConnect.addListener(nordFocusReveal.getFocusItem);