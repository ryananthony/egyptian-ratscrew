
/*
 * THIS HANDLES EACH TURN (when user drops card to pile)
 */

exports.index = function(req, res){

	//wrap in function so we get the timing right.
	function readAndUpdate (next) {
		global.fs.readFile('./gamedata/game.json', function (err,gameData) {
			if (err) { console.log('fail') }

			var gameJsonBuffer = JSON.parse(gameData);

			// if not set, it's the player's turn
			if (!res.locals.opponentName) {
				console.log('player\'s turn')
				gameJsonBuffer.pile.unshift(gameJsonBuffer.player.hand.shift());
				console.log(gameJsonBuffer.player.name + ' = ' + gameJsonBuffer.player.hand)
			} 
			else // else it's the opponent's turn
			{
				console.log('opponent\'s turn')
				for (var opp in gameJsonBuffer.opponents) 
				{
					if (gameJsonBuffer.opponents[opp].name == req.body.name) 
					{
						gameJsonBuffer.pile.unshift(gameJsonBuffer.opponents[opp].hand.shift());
						console.log(gameJsonBuffer.opponents[opp].name + ' = ' + gameJsonBuffer.opponents[opp].hand)
					}
				}			
			}

			// next refers to the inline function for writing the file back
			next(gameJsonBuffer, function (playerName,oppNames,card) {
				// send the response AFTER we write the file
				res.send({ player : playerName, opponents : oppNames, exposedCard : card }) //jquery now replaces value of card		
			});
		  
		})

	}

	readAndUpdate(function(data, last) {

		// after reading and changing data, we update the game file 
		global.fs.writeFile('./gamedata/game.json', JSON.stringify(data), function (err) {
	    if (err) {
	      console.log('fail')
	    }

			//make array of opponent names for tracking who's turn it is
			var opponentNames = []
			for (var opp in data.opponents) {
				opponentNames.push(data.opponents[opp].name);
			}

			last(data.player.name, opponentNames, data.pile[0])
			

		});


	});
	

};