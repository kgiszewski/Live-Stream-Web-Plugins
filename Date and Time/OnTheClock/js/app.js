var app = (function () {
	
	var startTimeInSeconds = 60;
	
	var seconds;
	
	var start = function(){
		seconds = startTimeInSeconds;
		
		startCountdown();
	}
	
	var updateClock = function() {
		seconds--;
		
		if(seconds < 0) {
			seconds = startTimeInSeconds;
		}
		
		var secondsLabel = (seconds > 9) ? seconds: "0" + seconds;
		
		$(".clock").text(secondsLabel); 
	}
	
		
	var startCountdown = function() {
		
		var handle = setInterval(updateClock, 1000);
		
		return handle;
	}
	
	return {
		start: start
	}		
})();

app.start();