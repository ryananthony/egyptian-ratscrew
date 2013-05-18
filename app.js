
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
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

//where we render the new game w/ our settings
app.get('/:action', function(req,res,next) {
	console.log(req.params)
	if (req.params.action == 'render') {
		res.locals.render = true;
	}
	next()
}, routes.index);

// where we initialize a new game
app.post('/', function(req,res,next) {
	
				console.log(req.body)

	// number of opponents chosen becomes size of players array + real player
	var players = new Array(parseInt(req.body.numOpponents) + 1)
	var pile = []

				//console.log('players size: ' + players.length)

	for (i=0;i<players.length;i++) {
		players[i] = new player.Opponent;
	}

	if (req.body.name) {
		players[0].name = req.body.name;
	} else {
		players[0].name = 'Player';
	}

	// create single deck, WITH jokers
	var deck = card.CreateDeck(1,parseInt(req.body.jokers))
	// shuffle deck with Josh's shuffle function
	card.Shuffle(deck)
	
	// deal the deck to the players, returns dealt players and the remaining cards
	var deal = card.Deal(players,deck)
	allPlayers = deal[0]
	pile = deal[1]
	res.locals.pile = pile

	//initilize the real player
	res.locals.player = allPlayers[0]

	//initize array of the opponents
	res.locals.opponents = []
	for (i=1;i<allPlayers.length;i++) {
		res.locals.opponents.push(allPlayers[i])
	}

	fs.readFile('./appdata/egyptian.txt', function(err, data){
    if (err) {
    	console.log('could not open Egyptian Names file')
    }

    var dataString = data.toString();
    var lines = dataString.split('\n');
    
    //for loop on opponents array
    for (var opponent in res.locals.opponents) {
    	   	
    	var confirmedUnique = '';

    	while (confirmedUnique == '') 
    	{
	    	// check we didn't already use name
	    	var nameCandidate = lines[Math.floor(Math.random()*lines.length)];

	    	for (index in res.locals.opponents) {
	    		if (res.locals.opponents[index].name == nameCandidate) 
	    		{
	    			console.log(nameCandidate + ' already used, getting next random name')
	    			break;
	    		}
	    		else
	    		{
	    			confirmedUnique = nameCandidate;
	    		}
	    	}

    	} //end while loop

    	res.locals.opponents[opponent].name = confirmedUnique;
    	
    }
    
		next() //this ouside the readFile results in undefined opponent names

	});

  
} ,routes.begin);


app.post('/turn', function(req,res,next) {
	console.log(req.body)
	if (req.body.turn == 'opponent') {
		res.locals.opponentName = req.body.name;
	}
	res.locals.hand = req.body.hand
	res.locals.pile = req.body.pile
	next()
}, turn.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
