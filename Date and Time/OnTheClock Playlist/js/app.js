var app = (function () {
	var showYellow = 45;
	var showRed = 15;		
	var $clock = $('.clock');
	var $clockWrapper = $('#onClock');
	var $headlineWrapper = $('#headline');
	var $headline = $('#headline h1');
	var headlineIndex = 0;
	
	var start = function(playlist) {
		//get first headline
		var firstHeadline = playlist[0];
		
		//set the text for headline
		$headline.text(firstHeadline.headline);
		
		var clock = new FlipClock($clock, firstHeadline.seconds, {
			clockFace: 'MinuteCounter',
			countdown: true,
			callbacks: {
				stop: function() {
					handleHeadlineChange(clock);
				},
				interval: function() {	
					handleClockColor(clock);							
				}					
			}				
		});
	}
		
	var handleHeadlineChange = function(clock) {
		//get next headline
		headlineIndex++;
		
		if(headlineIndex > playlist.length - 1) {
			headlineIndex = 0;
		}
				
		var nextHeadline = playlist[headlineIndex];		
		
		//fade away the old headline
		
		$headlineWrapper.fadeOut(function() {
			$headline.text(nextHeadline.headline);
		}).fadeIn();
		
		$clockWrapper.removeClass("red");						
		clock.setTime(nextHeadline.seconds);
		clock.start();	
	}	
	
	var handleClockColor = function(clock) {
		if(clock){
			var time = clock.time.time;
			
			if(time > showYellow){							
				$clockWrapper.addClass("green").removeClass("red");
			} else if(time == showYellow){
				$clockWrapper.removeClass("green").addClass("yellow");
			} else if(time == showRed){
				$clockWrapper.removeClass("yellow").addClass("red");
			}							
		}
	}
	
	return {
		start: start
	}		
})();


var playlist = [
	{
		headline: "Lorem ipsum dolar2",
		seconds: 60,
	},
	{
		headline: "The greatest show on Earth!",
		seconds: 75
	}
];

$(function() {	
	app.start(playlist);
});