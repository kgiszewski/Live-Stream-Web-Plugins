var app = (function () {

	var start = function() {
		getPrice();
		
		setInterval(getPrice, 60000);
	}
	
	var getPrice = function () {
		$.getJSON("https://api.coindesk.com/v1/bpi/currentprice.json", function( data ) {
			$("h1").text("Bitcoin $" + data.bpi.USD.rate);
		});
	}

	return {
		start: start
	}		
})();

app.start();