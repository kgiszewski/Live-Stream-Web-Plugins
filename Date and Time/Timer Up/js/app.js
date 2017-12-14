var app = (function () {

	var timer;
	var totalSeconds = 0;

	var start = function() {
		timer = setInterval(updateClock, 1000);
		totalSeconds = 0;
	}	
	
	var updateClock = function() {
		++totalSeconds;
	    var hour = Math.floor(totalSeconds / 3600);
	    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
	    var seconds = totalSeconds - (hour * 3600 + minute * 60);

		if(hour < 10) {
			hour = "0" + hour;
		}
		
		if(minute < 10) {
			minute = "0" + minute;
		}
		
		if(seconds < 10) {
			seconds = "0" + seconds;
		}
		
		$("h1").text(hour + ":" + minute + ":" + seconds);
	}

	return {
		start: start
	}		
})();

app.start();