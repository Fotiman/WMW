
    WebmasterWorld Favorite Forums
    Author: Peter Foti (fotiman@gmail.com)
    Version: 1.1.0


Revision History:
===================
1.1.0 (2015-04-27)
* Updated to support the recent WebmasterWorld updates, including https
* Updated to Chrome manifest 2.0.0


1.0.0 (2011-01-14)
 * Initial release
 * Favorites section shows up on page only after Favorites have been saved
 * In order for a Favorite to be shown, it's corresponding category must be
   expanded. If, for example, the "Code, Content, and Presentation" category
   is collapsed and you had previously defined the "HTML" forum as a favorite,
   "HTML" will not show up in your favorites until the category has been
   expanded. This extension clones existing DOM nodes, and on WebmasterWorld
   when a category is collapses, the underlying forums are not included on the
   page.
 * This extension is only available on the home.htm and indexv5.cgi pages
 * There is currently no way to re-order the favorites. They appear in the
   order that the originals appear in.


Wish List:
===================
 * Add the ability to re-order favorites
 * Add the ability to show forums without expanding categories
 * Define a build process to create minified versions of the files


*******************************************************************************
*
*    Files:
*
*******************************************************************************

background.html
-------------------
Contains the logic for accessing local storage, getting the array of favorites,
communicating with the content script, and showing the page action.


contentscript.js
-------------------
Runs in the context of the web page.  Contains the logic for creating the
markup for a new "Favorites" section in the web page, getting a map of
categories and forums from the page, sending the map to the background.html
page, and creating new markup for the array of favorites retrieved from the
background.html page.  If the markup of the WebmasterWorld.com forum list
changes, this file *should* be the only one that needs to change.  However,
if the URLs change (for example, if indexv5.cgi were to become indexv6.cgi),
then the manifest.json file will also need to be updated to match the new URLs.

Requires: jquery.js


favicon.ico, favicon48.png, favicon128.png
-------------------
favicon.ico is the favicon image from http://www.webmasterworld.com/favicon.ico
It is used in this extension with the permission of WebmasterWorld.com
owner and Administrator, Brett Tabke:
http://www.webmasterworld.com/profilev4.cgi?action=view&member=brett_tabke

Permission was obtained via private Moderator forum discussion on Jan 14, 2011:
http://www.webmasterworld.com/mods/4253295.htm

favicon48.png and favicon128.png are scaled versions derived from favicon.ico.
favicon48.png and favicon128.png were not provided by WebmasterWorld.


jquery.js
-------------------
jQuery v1.4.4
The contentscript uses jQuery to simplify DOM interactions.


manifest.json
-------------------
If the URLs change (for example, if indexv5.cgi were to become indexv6.cgi),
then the manifest.json file will also need to be updated to match the new URLs.
This file defines the resources and permissions used by this extension.


popup.html
-------------------
The page action that provides the UI for managing the list of favorites.  It
contains the logic for displaying the map of categories and forums that were
obtained by the content script.  Contains the UI for saving and clearing the
list of favorites.


README.TXT
-------------------
This text file.
