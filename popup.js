
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

