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

  function opponentsTurn (opponentNamesArray) {
    setTimeout(function() {
      if (opponentNamesArray[0]) //recursive base case, if first position exists...
      {
        $.post("/turn", {turn:"opponent",name:opponentNamesArray[0]}, function(ajaxResponse) {
          ajaxResponse.exposedCard = displayTopCard(ajaxResponse.exposedCard)
          //console.log(ajaxResponse.pile)
          $('.pile').css("background-color","#fdffdd");
          $('.pileTop > p').html(ajaxResponse.exposedCard);
          $('.pileBottom > p').html(ajaxResponse.exposedCard);
          $('#gameLog').prepend('<p>Opponent flipped the ' + ajaxResponse.exposedCard + '.')
          $('#' + opponentNamesArray[0]).css("background-color","red");
          opponentNamesArray.shift()
          opponentsTurn(opponentNamesArray);
          console.log(opponentNamesArray)
        });  
      } 
        else 
      {
        alert('player\'s turn')
        return false
        // fill a div indicating player's turn again
      }
    }, 1000)// end of timeout
  } // end of opponentsTurn function

   /***************************************
    ************* jQuery calls ************
    **************************************/ 

  $('#startButton').click(function() {
    $.post("/", $('form').serialize(), function(ajaxResponse) {

      if (typeof ajaxResponse.exposedCard !== 'undefined')
      {
        $('#pileStatus > h2').html('Current<br/>Pile Size: ' + ajaxResponse.exposedCard.length);
        console.log('The exposedCard has ' + ajaxResponse.exposedCard.length + ' cards currently.')

        //$('.pile').css("background-color","yellow");
      }

      
      // setInterval(function() {
        
      //   window.location.reload(true)
      // }, 50000);


      // if (typeof ajaxResponse.pile == 'undefined')
      // {
      //   $('.pile').css("background-color","yellow");
      // }
    });
  })




  $('.faceDownCard').draggable(
  	{ 
  		axis : "y",
  		helper : "clone",
  		containment : "#game",
      stop : function () {
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
    } //end draggable properties
  ); //end draggable





}); // end ready