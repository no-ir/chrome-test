
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
	if (tab.status === "complete") {
		var foundTab = $('#'+tabId);
		var foundMatch = re.exec(tab.url);
		
		if(foundTab.length === 0 && foundMatch != null) {
			//new
			if(tab.id) {
				var html = '<div class="row" id="' + tab.id + '"><p>' + tab.title + '</p></div>';
				$('body').append(html);
			}
		}
		else if(foundTab.length > 0){
			if(foundMatch != null) {
				//removing
				console.log('removing tab from html');
				$('#'+tabId).remove();
			}
			else if(foundMatch == null) {
				//update
				$('#'+tabId).html('<p>' + tab.title + '</p>');
				console.log('updating info: '+tab.title);
			}
		}
	}
});

chrome.tabs.onCreated.addListener(function(tab){

});

chrome.tabs.onActivated.addListener(function(activeInfo){
	console.log('activated')
});

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId){
	console.log('added tab');
})

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	console.log("removing");
	$('#'+tabId).remove();
});