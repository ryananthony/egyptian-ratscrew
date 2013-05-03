function flip(hand) {
    var playedCard = hand.shift()
    return [playedCard, hand]
}

function distDeck(numPlayers, deck) {
    // deck as parameter since can play with Jokers
    playerHands = new Array(numPlayers)

    var playerDealt = 0

    for (i=0;i<deck.length;i++) {
	// if we have dealt to all players, start over
	if (playerDealt = numPlayers - 1) { var playerDealt = 0 }
	playerHands[playerDealt].push(deck.shift())
	
	playerDealt++
    }
    
    return playerHands
}

var myHand = [4,2,6,3,13,11]

console.log(flip(myHand))
console.log(flip(myHand))

var deck = [2,3,5,2,3,5,1,6,7,7,5,3,2,6,7,8,4,4,3,12,3,5,6,3,2,1,6]
console.log(deck)
console.log(distDeck(5,deck))