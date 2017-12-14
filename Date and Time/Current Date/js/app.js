var app = (function () {

	var start = function() {
		
		var monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth();
		var yyyy = today.getFullYear();
		
		today = monthNames[mm] + ' ' + dd + ', ' + yyyy;
		
		$("h1").text(today);
	}	

	return {
		start: start
	}		
})();

app.start();