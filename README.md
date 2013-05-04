Egyptian Ratscrew
=================

Implementation of the 'slap-jack' inspired playing card game.

Specification
-------------

* Game will support 2-6 players.
* Deck will be distributed entirely (deckArray.pop to playerArray) until remaining cards < total players.
  Any remaining cards (in reverse order) will become the initial round's communityArray.
* Left of Dealer is first player to act.
* Each turn, (this) playerArray.pop to communityArray.
* At end of each round, each value in communityArray is pushed to winning playerArray, then initialized to [].

Dependencies
-------------------

* jQuery (building on [html5-boilerplate](http://html5boilerplate.com))