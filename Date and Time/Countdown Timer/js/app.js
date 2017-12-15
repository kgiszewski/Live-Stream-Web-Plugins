var app = (function () {
	var now = new Date();
	//this uses Countdown.js and Moment.js
	//http://countdownjs.org/readme.html
	//https://momentjs.com/docs/
	
	//this example is in the future by 25 hours, you can specify minutes, seconds, etc.
	//var endTime = moment(now).add(25, 'h').toDate();
	//var endTime = moment(now).add(30, 's').toDate();
	//this is an example of a date in the future
	var endTime = moment('2018-01-01').toDate();

	var start = function() {
		updateClock();
	}
		
	var updateClock = function() {
		//determine your labels here
		countdown.setLabels(
			'ms |s |m |h |d |w |mo |yr', //singular
			'ms |s |m |h |d |w |mo |yr', //plural
			'',                          //the last
			''                           //delimiter
		);
		
		var timerId = countdown(endTime, function(ts) {
				console.log(ts.value);
				if(ts.value > 0) {
					$("h1").text(0); 				
					
					clearInterval(timerId);
				}
				else {
					$("h1").text(ts.toString()); 
				}
			},
			//specify the units you want to show
			countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS
		);
	}
	
	return {
		start: start
	}		
})();

app.start();