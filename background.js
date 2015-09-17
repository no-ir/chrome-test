
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
	//console.log(changeInfo.status);
	//console.log(tab);

	var currentTitle = $('#'+tabId+' p').html();
	//console.log("current: "+currentTitle);
	var tabTitle = tab.title;
	//console.log("tab title: "+tab.title);
	if (tab.status === "complete" && currentTitle !== tabTitle)
	{
		var foundtab = $('#'+tabId);

		if(foundtab.length === 0){
			console.log('new tab');
			var re = new RegExp('.*.youtube.com\/watch\\?v=');

			if(re.test(tab.url)){
				if(tab.id){
					var html = '<div class="row" id="' + tab.id + '"><p>' + tab.title + '</p></div>';
					$('body').append(html);
				} else {
					console.log("tab.id not set");
				}
			}
			else
			{
				console.log("tab url did not match reg exp");
			}
		}
		else{
			$('#'+tabId).html('<p>'+tab.title+'</p>');
			console.log("updating info: "+ tab.title);
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