
/*
 * GET home page.
 */

exports.index = function(req, res){ // landing - gets numPlayers
	res.render('index', { 
		title: 'Ratscrew',
		topPile: '1S'
	});
};

exports.begin = function(req, res){

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

	res.end(gameData.pile[0]) //jquery now replaces value of card

};