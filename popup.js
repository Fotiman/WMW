var s = '',
    bgPage = chrome.extension.getBackgroundPage(),
    favorites = bgPage.getFavorites(),
    map = bgPage.pageData,
    n;


function refresh() {
    chrome.tabs.executeScript(null,
      {code:"window.location.reload();"});
}

function clearFavorites() {
    bgPage.clearStrg();
    refresh();
    self.close();
    
}

function saveFavorites() {
    var i,
        n,
        ops = document.getElementsByTagName('input'),
        favs = [];
    
    for (i = 0, n = ops.length; i < n; i++) {
        if (ops[i].type === 'checkbox' && ops[i].checked) {
            favs.push(ops[i].value);
        }
    }
    bgPage.setItem('favorites', JSON.stringify(favs));
    refresh();
    self.close();
}

// TODO: Make the favorites orderable and add drag and drop ordering
for (var n in map) {
    s += "<li>";
    s += "<h2>" + map[n].text + "</h2>";
    if (map[n].forums.length > 0) {
        s += "<ul>";
        for (var f in map[n].forums) {
            checked = false;
            if (favorites) {
                for (i = 0; i < favorites.length; i++) {
                    if (map[n].forums[f].url === favorites[i]) {
                        checked = true;
                        break;
                    }
                }
            }
            s += "<li>";
            s += "<input type='checkbox' value='" + map[n].forums[f].url + "' " + (checked? "checked='checked'" : "") + ">" + map[n].forums[f].text;
            s += "</li>";
        }
        s += "</ul>";
    }
    s += "</li>";
}

document.write(s);

window.onload = function () {
    document.getElementById('saveFav').onclick = saveFavorites;
    document.getElementById('clearFav').onclick = clearFavorites;
};