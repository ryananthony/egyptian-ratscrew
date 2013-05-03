function flip(hand) {
    var playedCard = hand.shift()
    return [playedCard, hand]
}

var myHand = [4,2,6,3,13,11]

console.log(flip(myHand))
console.log(flip(myHand))