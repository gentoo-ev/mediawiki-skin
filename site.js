YAHOO.namespace("cc.help");

// convenience function for creating help tool tips
YAHOO.cc.help.init_help_item = function(help_anchor) { 

    var link_id = help_anchor.id;
    var help_id = 'help_' + link_id;

    // make sure we have an array to hold the list of panels
    if (!YAHOO.cc.help.help_panels) {
			YAHOO.cc.help.help_panels = new Array();
    }
	
	 /* Align to the bottom right of the last column, 
	    default to bottom left */
	 if (YAHOO.util.Dom.hasClass(help_id, "topright")) {
		var theContext = [help_anchor, 'tr', 'br'];
	 } else {
		var theContext = [help_anchor, 'tl', 'bl'];
	 }
	 
	 if (help_id == "help_international_list") {
		var panelWidth = "180px";
	} else {
		var panelWidth = "280px";
	}
	
    // create the new panel and position it
    var new_panel = new YAHOO.widget.Panel(help_id, 
                            {close: false, title:false, 
			   visible: false, 
			   draggable: false, 
			   width: panelWidth, 
				effect: {effect:YAHOO.widget.ContainerEffect.FADE,duration:0.05},
			   context: theContext
			    } ); 

    var item_idx = YAHOO.cc.help.help_panels.push(new_panel) - 1;

    YAHOO.cc.help.help_panels[item_idx].render();

	// hideTimeout code adapted from http://jqueryfordesigners.com/coda-popup-bubbles/
	var hideDelay = 150;
	var hideTimeout = null;
	
	var showDelay = 500;
	var showTimeout = null;
	
	
   // connect the event handlers
	function showPanel(e) {
		if (hideTimeout) clearTimeout(hideTimeout);
		if (showTimeout) clearTimeout(showTimeout);
		
		showTimeout = setTimeout(function() {
			showTimeout = null;
			
		   YAHOO.cc.help.help_panels[item_idx].show();
		}, showDelay);

	
		YAHOO.util.Event.preventDefault(e);	   
	}
	
	function hidePanel(e) {
		if (hideTimeout) clearTimeout(hideTimeout);
		if (showTimeout) clearTimeout(showTimeout);
						
		hideTimeout = setTimeout(function() {
			hideTimeout = null;
							
		 	YAHOO.cc.help.help_panels[item_idx].hide();
		   
			YAHOO.util.Event.preventDefault(e);			
		}, hideDelay);
						
	}
	
   YAHOO.util.Event.addListener(link_id, "mouseover", showPanel);
	YAHOO.util.Event.addListener(link_id, "mouseout", hidePanel);
	
	YAHOO.util.Event.addListener(help_id, "mouseover", showPanel);
	YAHOO.util.Event.addListener(help_id, "mouseout", hidePanel);
		
} // init_help_text

var searchValue = "Search wiki";

function wakeSearch(e) {
		var search = document.getElementById("search");

		if (search.value == searchValue) {
			search.value = "";
			YAHOO.util.Dom.replaceClass(search, "inactive", "active");
		}	
	return false;
}
function resetSearch(e) {
	var search = document.getElementById("search");
	if (search.value == "") {
		search.value = searchValue;
		YAHOO.util.Dom.replaceClass(search, "active", "inactive");
	}
	
	return false;
}


YAHOO.cc.help.init = function() {
    // initialization for help pop-ups

	YAHOO.util.Dom.getElementsByClassName('helpLink', null, null,
											YAHOO.cc.help.init_help_item);
	
	document.getElementById("search").value = searchValue;
	YAHOO.util.Event.addListener("search", "click", wakeSearch);
	YAHOO.util.Event.addListener("search", "blur", resetSearch);
} // init

YAHOO.util.Event.onDOMReady(YAHOO.cc.help.init);
