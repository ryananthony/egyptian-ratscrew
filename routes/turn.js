
/*
 * THIS HANDLES EACH TURN (when user drops card to pile)
 */

exports.index = function(req, res){
	global.fs.readFile('./gamedata/game.json', function (err,gameData) {
		if (err) { console.log('fail') }

		var gameJsonBuffer = JSON.parse(gameData)

		var playedCard = gameJsonBuffer.player.hand.shift()
		gameJsonBuffer.pile.unshift(playedCard)

		// now we update the game file on the server with the new data
		global.fs.writeFile('./gamedata/game.json', JSON.stringify(gameJsonBuffer), function (err) {
	    if (err) {
	      console.log('fail')
	    }
		});

	  res.end(playedCard) //jquery now replaces value of card
	})


};