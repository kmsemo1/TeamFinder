// Pull in required dependencies
var path = require('path');
// Import the list of friend entries
var teams = require('../data/teams.js');
// Export API routes
module.exports = function(app) {    //https://nodejs.org/api/modules.html#modules_module_exports
	// Total list of friend entries
	app.get('/api/teams', function(req, res) {   //http://expressjs.com/en/guide/routing.html
		res.json(teams);
	});
	// Add new friend entry
	app.post('/api/teams', function(req, res) {  //http://expressjs.com/en/guide/routing.html
		// Capture the user input object
		var userInput = req.body;
		var userResponses = userInput.scores;

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 40000; // Make the initial value big for comparison
        var matchLink = '';
		// Examine all existing friends in the list
		for (var i = 0; i < teams.length; i++) {	
			// Compute differenes for each question, hence the new var variable for the For loop
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(teams[i].scores[j] - userResponses[j]);
			}
			// If lowest difference, record the friend match
			if (diff < totalDifference) {	
				totalDifference = diff;
				matchName = teams[i].name;
                matchImage = teams[i].photo;
                matchLink = teams[i].link;
			}
		}
		// Add new user
		teams.push(userInput);
		// Send response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage, matchLink: matchLink}); //https://www.npmjs.com/package/res-json
	});
};