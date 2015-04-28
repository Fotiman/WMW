(function () {
var map = {},       // map of visible categories/forums
    messageBoardTable = $("table thead.section").parents('table').get(0);


/**
 * Insert a new row into the table to identify the section as Favorites and 
 * return a reference to the newly created row.
 * @return {$(HTMLElement)} The newly created row
 */
function createfavoritesHeader() {
    $($(messageBoardTable).find('.section').get(0)).after(
        '<thead class="section">' +
        '<tr id="favoritesHeader">' +
        '  <td colspan="2">' +
        '    <strong>Favorites</strong>' +
        '  </td>' +
        '  <td colspan="2">&nbsp;</td>' +
        '  <td>' +
        '    Category Administrator <strong>YOU</strong>' +
        '  </td>' +
        '</tr>' +
        '</thead>'
    );
    return $('#favoritesHeader');
}

function createfavoritesContent() {
    var tbody = $('<tbody />');
    $('#favoritesHeader').parent('thead').after(tbody);
    return tbody;
}

/**
 * Gets a map of the categories and forums on the current page
 * @return {Object} The object literal that maps categories and forums in the
 * format:
 * {
 *   'CATEGORY URL': {
 *     'text': 'CATEGORY TEXT',
 *     'forums': [
 *       {'url': 'FORUM URL', 'text': 'FORUM TEXT'},
 *       ...
 *     ]
 *   },
 *   ...
 * }
 */
function getPageMap() {
    var currentCat,     // the category url
        currentForum,   // the forum url
        el,             // the link element
        map = {},       // the map of categories and forums
        text;           // the text of a url
    
    // for each row in the table, determine if its a category or forum and add
    // it to the map appropriately
    $(messageBoardTable).find('tr').each(function (index, element) {
        //if (index === 0) { // skip the first row, doesn't contain a category
        //    return;
        //}
        
        // find the first <a> element, which is a link to a category or forum
        el = $(element).find('a[href]').get(0);
        text = $(el).text();
        if ($(element).parents(".section").length > 0) {
        //if ($(element).attr('bgcolor') === '#9999FF') {
            // this is a category
            currentCat = $(el).attr('href');
            if (currentCat != "undefined" && text != "") {
                map[currentCat] = {text: text, forums: []};
            }
        }
        else {
            // this MAY be a forum
            currentForum = $(el).attr('href');
            if (currentForum != "undefined" && text != "") {
                map[currentCat].forums.push({url: currentForum, text: text});
            }
        }
    });
    return map;
}


// If the WebmasterWorld markup changes such that we can't find the forum index
// table, then we need not go any further.
if (messageBoardTable.length === 0) {
    return;
}

// Get the map of the page BEFORE we add our favorites to it
map = getPageMap();

// notify the background page.
chrome.extension.sendRequest(map, function(response) {
    var favorites,       // the array of selectors that identify our favorites
        favoritesHeader, // the header inserted to display before our favorites
        i,               // index in loop
        $tbody,
        tr;              // will hold a clone of a <tr> to copy to favorites
    
    // The array of favorites is returned from the background page
    favorites = response;

    if (favorites && favorites.length > 0) {
        // Create a favorites section for our favorites
        favoritesHeader = createfavoritesHeader();
        $tbody = createfavoritesContent();
    
        // Copy each of our favorite rows to the favorites section
        for (i = favorites.length; i > 0; i--) {
            tr = $($('a[href="' + favorites[i-1] + '"]').parents('tr').get(0)).clone();
            $tbody.append(tr);
        }
    }
});

})();