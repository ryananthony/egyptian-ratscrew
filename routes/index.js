
/*
 * GET home page.
 */

exports.index = function(req, res){ 

	// initial get request with our vars
	global.fs.readFile('./gamedata/game.json', function (err,gameData) {
		if (err) { console.log('fail') }
			
		var gameJsonBuffer = JSON.parse(gameData);

		if (res.locals.render == true) { 
			console.log('hit start block')
			res.render('index', { 
				title: 'Ratscrew',
				opponents: gameJsonBuffer.opponents,
				name : gameJsonBuffer.player.name, 
				exposedCard : gameJsonBuffer.pile[0]
			});
			res.end();
		}
		else  // landing - gets numPlayers
		{
			res.render('index', { 
				title: 'Ratscrew',
				opponents: [],
				exposedCard: []
			});
		}
	})
}

exports.begin = function(req, res){
	//console.log('at route: ' + res.locals.opponents[0].name)
	var gameData = {}
	gameData.opponents = res.locals.opponents
	gameData.player = res.locals.player
	gameData.pile = res.locals.pile

	console.log(gameData)

	//create gamedata file, this should be a unique filename for production
	global.fs.writeFile('./gamedata/game.json', JSON.stringify(gameData), function (err) {
    if (err) {
      console.log('fail')
    }
	});

	//make array of opponent names for tracking who's turn it is
	var opponentNames = []
	for (var opp in gameData.opponents) {
		opponentNames.push(gameData.opponents[opp].name);
	}


	res.render('game', { 
		title: 'Ratscrew',
		opponents: gameData.opponents,
		name : gameData.player.name, 
		exposedCard : gameData.pile[0]
	});
	// conditional based on player name sent from jQuery
	//res.send({ name : gameData.player.name, opponents: opponentNames, exposedCard : gameData.pile[0] }) //jquery now replaces value of card

};