$(document).ready(function() {

  /***************************************
  *********** helper functions ***********
  ***************************************/

  function displayTopCard(cardString) {
    if (cardString.substring(0,cardString.length - 1) == '11') 
    {
      cardString = 'J' + cardString.substring(cardString.length - 1,cardString.length)
    }
    if (cardString.substring(0,cardString.length - 1) == '12') {
      cardString = 'Q' + cardString.substring(cardString.length - 1,cardString.length)
    }
    if (cardString.substring(0,cardString.length - 1) == '13') {
      cardString = 'K' + cardString.substring(cardString.length - 1,cardString.length)
    }
    if (cardString.substring(0,cardString.length - 1) == '1') {
      cardString = 'A' + cardString.substring(cardString.length - 1,cardString.length)
    }
    if (cardString.substring(0,cardString.length - 1) == '14' ||
        cardString.substring(0,cardString.length - 1) == '15') {
      cardString = 'J'
    }

    switch(cardString.substring(cardString.length - 1,cardString.length))
    {
      case 'S':
        cardString = cardString.substring(0,cardString.length - 1) + '&spades;'
        break
      case 'H':
        cardString = cardString.substring(0,cardString.length - 1) + '&hearts;'
        break
      case 'C':
        cardString = cardString.substring(0,cardString.length - 1) + '&clubs;'
        break
      case 'D':
        cardString = cardString.substring(0,cardString.length - 1) + '&diams;'
        break
    }

    return cardString;
  }

  function playersTurn () {
        // check position of dragged card
        // be sure it's in Game Pile boundary
        
        // send topCard thru ajax - server will 'flip' to 'pile'
        $.post("/turn", {turn:"player"}, function(ajaxResponse) {
          console.log('turn: ' + ajaxResponse.exposedCard)
          
          ajaxResponse.exposedCard = displayTopCard(ajaxResponse.exposedCard)

            //console.log(ajaxResponse.pile)
            $('.pile').css("background-color","#fdffdd");
            $('.pileTop > p').html(ajaxResponse.exposedCard);
            $('.pileBottom > p').html(ajaxResponse.exposedCard);
            $('#gameLog').prepend('<p>Player flipped the ' + ajaxResponse.exposedCard + '.')

            opponentsTurn(ajaxResponse.opponents)

          });
      } //end stop

  function opponentsTurn (opponentNamesArray) {
    if (opponentNamesArray[0]) //recursive base case, if first position exists...
      {
        $('#' + opponentNamesArray[0]).css("background-color","red");
        setTimeout(function() {

          $.post("/turn", {turn:"opponent",name:opponentNamesArray[0]}, function(ajaxResponse) {
            ajaxResponse.exposedCard = displayTopCard(ajaxResponse.exposedCard)
            //console.log(ajaxResponse.pile)
            $('.pile').css("background-color","#fdffdd");
            $('.pileTop > p').html(ajaxResponse.exposedCard);
            $('.pileBottom > p').html(ajaxResponse.exposedCard);
            $('#gameLog').prepend('<p>' + opponentNamesArray[0] + ' flipped the ' + ajaxResponse.exposedCard + '.')
            $('#' + opponentNamesArray[0]).css("background-color","inherit");
            console.log(opponentNamesArray)

            opponentNamesArray.shift()
            opponentsTurn(opponentNamesArray);
            
          });  

        }, 1000)// end of timeout

      } 
        else 
      {
        alert('player\'s turn')
        return false
        // fill a div indicating player's turn again
      }
    
  } // end of opponentsTurn function




   /***************************************
    ************* jQuery calls ************
    **************************************/ 

  $('#startButton').click(function() {
    $.post("/", $('form').serialize(), function(ajaxResponse) {

      var gameDiv = $(ajaxResponse).find('#game');
      $('#gameArea').html(gameDiv);
      if (typeof ajaxResponse.exposedCard !== 'undefined')
      {
        ajaxResponse.exposedCard = displayTopCard(ajaxResponse.exposedCard)
        $('.pile').css("background-color","#fdffdd");
        $('.pileTop > p').html(ajaxResponse.exposedCard);
        $('.pileBottom > p').html(ajaxResponse.exposedCard);
        $('#pileStatus > h2').html('Current<br/>Pile Size: ' + ajaxResponse.exposedCard.length);
        console.log('The exposedCard has ' + ajaxResponse.exposedCard.length + ' cards currently.')
      }
      // $.get("/render", function(ajaxResponse) {
      //console.log(ajaxResponse);
      // });

    });
  })

// this makes possible using draggable AFTER page is AJAX'd
$(document).on('mousedown', '.faceDownCard', function() {
  $(this).draggable(
    { 
      axis : "y",
      helper : "clone",
      containment : "#game",
      stop : function() { playersTurn(); }
    } //end draggable properties
  ) //end draggable
});

  // $('.faceDownCard').draggable(
  // 	{ 
  // 		axis : "y",
  // 		helper : "clone",
  // 		containment : "#game",
  //     stop : function() { playersTurn(); }
  //   } //end draggable properties
  // ); //end draggable


}); // end ready


