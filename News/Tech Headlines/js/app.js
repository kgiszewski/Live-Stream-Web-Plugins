var app = (function () {

	var start = function() {
		getHeadlines();
	}
	
	var getHeadlines = function () {
		
		var headlines = [
			'Follow the show on Twitter @BobAndKevinShow',
			'Please share, like & subscribe the show!'
		];
		
		$.ajax({
			type: "GET",
			url: "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=60cca6ac1f72453e88d877d6ed6963bf",
			dataType: "json"
		}).done(function( data ) {
			for(var i = 0; i < data.articles.length; i++) {
				headlines.push(data.articles[i].title);
				
				var concatHeadlines = headlines.join(" - ");
				
				$("marquee").text(concatHeadlines);
			}
		});
	}

	return {
		start: start
	}		
})();

app.start();