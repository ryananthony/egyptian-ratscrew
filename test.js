var card = require('card.js');

//DECLARE NUMBER OF PLAYERS
var numPlayers = 6;

console.log('*****TESTING DEALING FUNCTION*****');
var deck = [2,3,3,6,5,2,3,5,1,7,5,3,2,6,7,8,4,4,3,12,3,5,3,3,2,1,6];

console.log('original deck = ' + deck);
console.log('distributed deck... returned[0] = hands, returned[1] = remaining cards.');

var start = card.Deal(deck,numPlayers);

for (i=0;i<start[0].length;i++) 
{
    console.log('Player at position ' + i + '\'s hand is ' + start[0][i].hand);
}

console.log('Remaining Cards: ' + start[1]);

///////////////////////////////////////////////////

console.log('*****TESTING PLAYER OBJECT*****');

var firstPlayer = start[0][0];

console.log('player\'s hand initialized to ' + firstPlayer.hand);

console.log('flip() function called... player played ' + firstPlayer.flip());
console.log('player\'s hand is now ' + firstPlayer.hand);
console.log('flip() called again... this time ' + firstPlayer.flip() + ' was played');
console.log('player\'s hand is now ' + firstPlayer.hand);