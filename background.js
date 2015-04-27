// When true, this will output messages to the console (for debugging)
var logging = true;


/**
 * Save an item to localstorage
 * @param {String} key The key name used to identify the item in localstorage
 * @param {String} value The string value to store
 */
function setItem(key, value) {
    try {
        log("Inside setItem:" + key + ":" + value);
        window.localStorage.removeItem(key);
        window.localStorage.setItem(key, value);
    } catch(e) {
        log("Error inside setItem");
        log(e);
    }
    log("Return from setItem" + key + ":" +  value);
}


/**
 * Get an item from local storage
 * @param {String} key The key name used to identify the item in localstorage
 * @return {String} The string value that was stored in localstorage
 */
function getItem(key) {
    var value;
    log('Get Item:' + key);
    try {
        value = window.localStorage.getItem(key);
    } catch(e) {
        log("Error inside getItem");
        log(e);
        value = "null";
    }
    log("Returning value: " + value);
    return value;
}


/**
 * Clears all the key value pairs in the local storage
 */
function clearStrg() {
    log('Clearing local storage');
    window.localStorage.clear();
    log('Local storage cleared.');
}


/**
 * Log a message to the console if logging is set to true
 * @param {String} txt The message to log
 */
function log(txt) {
    if (logging) {
        console.log(txt);
    }
}


/**
 * Return an array of selectors that identify the current favorites
 * @return {Array} The array of selectors that identify the current favorites
 */
function getFavorites() {
    // Get the values from localstorage
    var result = JSON.parse(getItem('favorites'));

    return result;
}


/**
 * When a message is passed from the content script, show the page action and
 * return the array of favorites to the content script.
 */
function onRequest(request, sender, sendResponse) {
    // Store the data that was passed via request in a global variable
    pageData = request;
    
    // Show the page action
    chrome.pageAction.show(sender.tab.id);
    
    // Return the array of favorites
    sendResponse(getFavorites());
};

// Register the listener 
chrome.extension.onRequest.addListener(onRequest);
