
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , turn = require('./routes/turn')
  , http = require('http')
  , path = require('path')
  , player = require('player')
  , card = require('card');

var app = express();

var init = function() {

}

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

app.get('/', function(req,res,next) {
	// if user just hit the site, need to get value of numPlayers
	var players = new Array(4) //need to set this to value from init site
	var pile = []

	for (i=0;i<players.length;i++) {
		players[i] = new player.Player;
	}

	//console.log(players)

	//console.log(card.CreateDeck(1,1))
	var deck = card.CreateDeck(1,1)

	card.Shuffle(deck)
	
	var deal = card.Deal(players,deck)

	players = deal[0]
	pile = deal[1]

	//debugging
	// 	for (i=0;i<players.length;i++) 
	// 	{
	// 	    console.log('Player at position ' + i + '\'s hand is ' + players[i].hand);
	// 	}

	// console.log(pile)

	// end debugging

	//function init;
	res.locals.hand = players[0].hand
	res.locals.pile = pile
    //console.log(req.body)

    next()
} ,routes.index);


app.post('/turn', function(req,res,next) {
	console.log(req.body)
	console.log(res.locals.hand)
	res.locals.hand = ['03H','06S','11C']
	//res.locals.pile.card.Flip(topCard)
	res.locals.pile = ['03H','06S']
    //console.log(req.body)
    next()
} ,turn.turn);


app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
