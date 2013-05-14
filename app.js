
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , turn = require('./routes/turn')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , player = require('player')
  , card = require('card');

var app = express();

global.fs = fs

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// the landing page where we get number of opponents
app.get('/', routes.index);

// where we initialize a new game
app.post('/', function(req,res,next) {
	
				//console.log(req.body)

	// number of opponents chosen becomes size of players array + real player
	var players = new Array(parseInt(req.body.numOpponents) + 1)
	var pile = []

				//console.log('players size: ' + players.length)

	for (i=0;i<players.length;i++) {
		players[i] = new player.Player;
	}

	// create single deck, WITH jokers
	var deck = card.CreateDeck(1,1)
	// shuffle deck with Josh's shuffle function
	card.Shuffle(deck)
	
	// deal the deck to the players, returns dealt players and the remaining cards
	var deal = card.Deal(players,deck)
	players = deal[0]
	pile = deal[1]

	//initilize the real player
	res.locals.player = players[0]

	//initize array of the opponents
	res.locals.opponents = []
	for (i=1;i<players.length;i++) {
		res.locals.opponents.push(players[i])
	}

	//initialize the starting pile
	res.locals.pile = pile

  next()
} ,routes.begin);


app.post('/turn', function(req,res,next) {
	if (req.body.action == 'dropped') {

	}
	res.locals.hand = req.body.hand
	res.locals.pile = req.body.pile
	next()
}, turn.index);


app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
