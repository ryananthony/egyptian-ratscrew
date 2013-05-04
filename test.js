var card = require('card.js');
var player = require('player.js');


var myHand = [4,2,6,3,13,11];

var firstPlayer = new player.Player;

console.log('*****TESTING DEALING FUNCTION*****');
var deck = [2,3,3,6,5,2,3,5,1,7,5,3,2,6,7,8,4,4,3,12,3,5,3,3,2,1,6];

console.log('original deck = ' + deck);
console.log('distributed deck... returned[0] = hands, returned[1] = remaining cards.');
console.log(card.Deal(5,deck));

console.log('*****TESTING PLAYER OBJECT*****');
firstPlayer.hand.push(3,4,5,3);
console.log('player\'s hand initialized to ' + firstPlayer.hand);

console.log('flip() function called... player played ' + firstPlayer.flip());
console.log('player\'s hand is now ' + firstPlayer.hand);
console.log('flip() called again... this time ' + firstPlayer.flip() + ' was played');
console.log('player\'s hand is now ' + firstPlayer.hand);