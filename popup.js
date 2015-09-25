chrome.runtime.sendMessage("psend", function(res){
	console.log(res);
	if(res){
		$('#content').append(res.response);
	}
	else
	{
		console.log(chrome.runtime.lastError);
	}
});

function getTabId(t){
	return $(t).parent().parent().parent().attr("id");
}

$(document).on('click', '.play', function(){
	var tabId = getTabId(this);
	console.log(tabId);
	chrome.tabs.sendMessage(parseInt(tabId), {action: "play"});
});

$(document).on('click', '.pause', function(){
	var tabId = getTabId(this);
	console.log(tabId);
	chrome.tabs.sendMessage(parseInt(tabId), {action: "pause"});
});

$(document).on('click', '.mute', function(){
	var tabId = getTabId(this);
	console.log(tabId);
	chrome.tabs.sendMessage(parseInt(tabId), {action: "mute"});
});