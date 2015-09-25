chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	if( message instanceof Object){
		var vid = document.getElementsByTagName('video')[0];
		var op = message.action;
		
		switch(op){
			case "play":
				console.log("play");
				vid.play();
				break;
				
			case "pause":
				console.log("pause");
				if( !vid.paused )
					vid.pause();
				break;
				
			case "mute":
				if( !vid.muted )
					vid.muted = true;
				else
					vid.muted = false;

				break;
				
			default:
				console.log("nothing to do");
		}
	}
	else {
		console.log("unrecognized message received");
	}	
});