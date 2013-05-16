
/*
 * GET home page.
 */

exports.index = function(req, res){ // landing - gets numPlayers

fs.exists('./gamedata/game.json', function(exists) {
  if (exists) 
  {
	global.fs.readFile('./gamedata/game.json', function (err,gameData) {
		if (err) { console.log('fail') }

		var gameJsonBuffer = JSON.parse(gameData)

		// for the window.reload event after ajax submission
		res.render('index', { 
			title: 'Ratscrew',
			opponents: gameJsonBuffer.opponents,
			name : gameJsonBuffer.player.name, 
			pile : gameJsonBuffer.pile[0]
		});
	})
  } 
  else // the initial load for setting game options
  {
		res.render('index', { 
			title: 'Ratscrew',
			opponents: [],
			pile: []
		});
  }
});

};

exports.begin = function(req, res){
	console.log('at route: ' + res.locals.opponents[0].name)
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

	// conditional based on player name sent from jQuery
	res.send({ name : gameData.player.name, pile : gameData.pile[0] }) //jquery now replaces value of card

};