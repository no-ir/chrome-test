chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	if(message === "psend"){
		console.log("received...");
		sendResponse({response: $('body').html()})
	}
	else{
		console.log(message);
		$('body').append("<p>Aphex</p>");
	}

});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	var re = /.*\.youtube.com\/watch\?v=.*/;
	var foundMatch = re.exec(tab.url);
	var foundTab = $('#'+tabId);

	if (tab.status === "complete") {
		if(foundTab.length === 0 && foundMatch != null) {
			console.log("new tab");
			if(tab.id) {
				var html = '<div class="row" id="'+ tabId +'"><div class="title"><p>' + (tab.title).slice(0, 20) + '...' + '</p></div> \
						  <div class="controls"><ul><li><a href="play"><img src="play-circle-2x.png"></a></li> \
						  <li><a href="pause"><img src="media-pause-2x.png"></a></li> \
						  <li><a href="next"><img src="media-skip-forward-2x.png"></a></li> \
						  <li><a href="mute"><img src="volume-off-2x.png"></a></li></ul></div></div>';

				$('body').append(html);
			}
		}
		else if(foundTab.length > 0 && foundMatch == null) {
			//removing
			console.log('removing tab from html');
			$('#'+tabId).remove();
		}
		else if(foundTab.length > 0 && foundMatch != null) {
			//update
			$('#'+tabId+'> div p').html('<p>' + (tab.title).slice(0, 20) + '...</p>');
			console.log('updating info: '+tab.title);
		}
	}
});

chrome.tabs.onCreated.addListener(function(tab){

});

chrome.tabs.onActivated.addListener(function(activeInfo){
	console.log('activated')
});

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId){
	console.log('replaced tab');
	$('#'+removedTabId).remove();
})

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	console.log("removing");
	$('#'+tabId).remove();
});