
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
	if(changeInfo.url){
		console.log(changeInfo.url);
	}
});

chrome.tabs.onCreated.addListener(function(tab){
	var re = new RegExp('.*.youtube.com\/watch\\?v=');

	if(re.test(tab.url)){
		if(tab.id){
			var html = '<div class="row" id="' + tab.id + '"><p>' + tab.url + '</p></div>';
			$('body').append(html);
		} else {
			console.log("tab.id not set");
		}
	}
	else
	{
		console.log("tab url did not match reg exp");
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo){
	console.log('activated')
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	console.log("removing");
	$('#'+tabId).remove();
});