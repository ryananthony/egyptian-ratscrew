function flip(hand) {
    var playedCard = hand.shift()
    return [playedCard, hand]
}

function distDeck(numPlayers, deck) {
    // deck as parameter since can play with Jokers
    var playerHands = new Array(numPlayers)
    var playerDealt = 0

    //since we're 'shifting', need to save initial length in variable
    var deckSize = deck.length

    // extra cards become initial game card pile to keep hands even
    var initialPile = []

    for (i=0;i<deckSize;i++) {
	// if we have dealt to all players, start over
	if (playerDealt > numPlayers - 1) { playerDealt = 0 }
	if (!playerHands[playerDealt]) { playerHands[playerDealt] = new Array() }
	if (playerDealt == 0 && deck.length < numPlayers) { initialPile = deck; break }
	playerHands[playerDealt].push(deck.shift())
	
	playerDealt++
    }
    
    return [playerHands, initialPile]
}

var myHand = [4,2,6,3,13,11]

console.log('"Playing" = flipping top card off top of hand.') 
console.log('flip...' + flip(myHand))
console.log('flip...' + flip(myHand))

var deck = [2,3,3,6,5,2,3,5,1,7,5,3,2,6,7,8,4,4,3,12,3,5,3,3,2,1,6]

console.log('original deck = ' + deck)
console.log('distributed deck... returned[0] = hands, returned[1] = remaining cards.')
console.log(distDeck(5,deck))
