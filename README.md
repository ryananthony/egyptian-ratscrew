Egyptian Ratscrew
=================

In progress implementation of the 'slap-jack' inspired playing card game.

STILL TO DO
-----------

* Logic for handling all the different face cards.
* Random moving div with the label 'SLAP' for slapping doubles.
  If clicked when pile[0] not equal to pile[1], user's top card is pushed to pile.
* Unique game ID for passing in and out of jQuery allowing concurrent games.
* Saving of High Scores to a system file.
* Appending to visual game log the results of each opponent's turn.
* Art for the game area and opponents.

SPECIFICATION
=============

The goal is to collect all the cards in as little time as possible.

* Single player with up to 5 opponents.
* Left of Dealer is the first player to act.
* Players do not look at their hands and the card order is always maintained.
* On his turn, a player 'flips' the first card out of their hand on the community pile.
* If the card played is not a face card, Ace (or Joker if used) then the next player goes.
* If the card played is a face card, the next player has 'n' chances to also produce a face card.
    * Facecard 'Chance' Values: Jack = 1, Queen = 2, King = 3, Ace = 4, Joker (if used) = 5.
    * At any time, a player can 'slap' doubles to win the community pile immediately.
* If a player runs out of cards, he still has the opportunity to slap doubles in order to get back into the game.
* Once a player has collected all the cards, he performs a 'flip-through' of the entire deck and players have one last opportunity to 'slap in'.

Dependencies
-------------------
* NodeJS Express Framework
    * using JADE templating engine
* jQuery 1.9.1
* jQuery Mobile 1.3.1
* jQuery UI 1.10.3
    * including Touch Punch (hack for dragging divs on mobile devices)

Contributors
------------

* Josh Vogel - Using slightly altered version of his simpleShuffle function.
* Austin Bass - Significant contribution to the code push on 5/11/13.