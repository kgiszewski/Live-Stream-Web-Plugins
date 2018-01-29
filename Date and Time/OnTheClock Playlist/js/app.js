var app = (function () {
	var showYellow = 45;
	var showRed = 15;		
	var $clock = $('.clock');
	var $clockWrapper = $('#onClock');
	var $headlineWrapper = $('#headline');
	var $headline = $('#headline h1');
	var $nextHeadline = $('#headline h2');
	var headlineIndex = -1;
	var audio = new Audio('mp3/beep_short.mp3');
	var delayInMillisecondsBetweenHeadlines = 3000;
	var showNextHeadlineUnderCurrent = true;
	
	var start = function(playlist) {	
		var clock = new FlipClock($clock, {
			clockFace: 'MinuteCounter',
			countdown: true,
			callbacks: {
				stop: function() {				
					setTimeout(function(){
						handleHeadlineChange(clock);	
					}, delayInMillisecondsBetweenHeadlines);
				},
				interval: function() {	
					handleClockColor(clock);							
				}					
			}				
		});
		
		handleHeadlineChange(clock);
	}
	
	var getNextHeadlineText = function() {
		
		if(!showNextHeadlineUnderCurrent) {
			return;
		}
		
		var headline = "";
		var nextHeadlineIndex = headlineIndex + 1;
		
		if(playlist[nextHeadlineIndex]) {
			headline = "Next Up: " + playlist[nextHeadlineIndex].headline;
		}
		
		return headline;
	}
			
	var handleHeadlineChange = function(clock) {							
		//get next headline
		headlineIndex++;
		
		//test for end of the playlist
		if(headlineIndex > playlist.length - 1) {
		    handlePlaylistEnd();
			
			return;
		}
				
		audio.play();
				
		var nextHeadline = playlist[headlineIndex];		
				
		$headlineWrapper.fadeOut(function() {
			$headlineWrapper;
			$headline.text(nextHeadline.headline);
			$nextHeadline.text(getNextHeadlineText());
		}).fadeIn();
		
		$clockWrapper.removeClass("red");		
				
		clock.setTime(nextHeadline.seconds);
		clock.start();
	}
	
	var handlePlaylistEnd = function() {
		$clockWrapper.fadeOut();
		$headlineWrapper.fadeOut();
	}
	
	var handleClockColor = function(clock) {
		if(clock){
			var time = clock.time.time;
						
			if(time > showYellow){							
				$clockWrapper.addClass("green").removeClass("red");
			} else if(time <= showYellow && time >= showRed){
				$clockWrapper.removeClass("green").addClass("yellow");
			} else if(time <= showRed){
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
		headline: "I show for 10 seconds",
		seconds: 10,
	},
	{
		headline: "I show for 60 seconds",
		seconds: 60
	},
	{
		headline: "I show for 90 seconds",
		seconds: 90
	},
	{
		headline: "I show for 120 seconds",
		seconds: 120
	}
];

$(function() {	
	app.start(playlist);
});