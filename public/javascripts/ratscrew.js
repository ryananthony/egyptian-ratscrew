$(document).ready(function() {

  $('#startButton').click(function() {
    $.post("/", $('form').serialize(), function(cardValue) {

          if (cardValue.substring(0,cardValue.length - 1) == '11') {
            cardValue = 'J' + cardValue.substring(cardValue.length - 1,cardValue.length)
          }
          if (cardValue.substring(0,cardValue.length - 1) == '12') {
            cardValue = 'Q' + cardValue.substring(cardValue.length - 1,cardValue.length)
          }
          if (cardValue.substring(0,cardValue.length - 1) == '13') {
            cardValue = 'K' + cardValue.substring(cardValue.length - 1,cardValue.length)
          }
          if (cardValue.substring(0,cardValue.length - 1) == '1') {
            cardValue = 'A' + cardValue.substring(cardValue.length - 1,cardValue.length)
          }
          if (cardValue.substring(0,cardValue.length - 1) == '14' ||
              cardValue.substring(0,cardValue.length - 1) == '15') {
            cardValue = 'J'
          }

          switch(cardValue.substring(cardValue.length - 1,cardValue.length))
          {
            case 'S':
              cardValue = cardValue.substring(0,cardValue.length - 1) + '&spades;'
              break
            case 'H':
              cardValue = cardValue.substring(0,cardValue.length - 1) + '&hearts;'
              break
            case 'C':
              cardValue = cardValue.substring(0,cardValue.length - 1) + '&clubs;'
              break
            case 'D':
              cardValue = cardValue.substring(0,cardValue.length - 1) + '&diams;'
              break
          }

      $('.pileTop > p').html(cardValue);
      $('.pileBottom > p').html(cardValue);
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
        $.post("/turn", {action:"dropped"}, function(cardValue) {
          if (cardValue.substring(0,cardValue.length - 1) == '11') {
            cardValue = 'J' + cardValue.substring(cardValue.length - 1,cardValue.length)
          }
          if (cardValue.substring(0,cardValue.length - 1) == '12') {
            cardValue = 'Q' + cardValue.substring(cardValue.length - 1,cardValue.length)
          }
          if (cardValue.substring(0,cardValue.length - 1) == '13') {
            cardValue = 'K' + cardValue.substring(cardValue.length - 1,cardValue.length)
          }
          if (cardValue.substring(0,cardValue.length - 1) == '1') {
            cardValue = 'A' + cardValue.substring(cardValue.length - 1,cardValue.length)
          }
          if (cardValue.substring(0,cardValue.length - 1) == '14' ||
              cardValue.substring(0,cardValue.length - 1) == '15') {
            cardValue = 'J'
          }

          switch(cardValue.substring(cardValue.length - 1,cardValue.length))
          {
            case 'S':
              cardValue = cardValue.substring(0,cardValue.length - 1) + '&spades;'
              break
            case 'H':
              cardValue = cardValue.substring(0,cardValue.length - 1) + '&hearts;'
              break
            case 'C':
              cardValue = cardValue.substring(0,cardValue.length - 1) + '&clubs;'
              break
            case 'D':
              cardValue = cardValue.substring(0,cardValue.length - 1) + '&diams;'
              break
            // case 'J':
            //   cardValue = '<strong>J</strong>'
          }

            console.log(cardValue)
            $('.pileTop > p').html(cardValue);
            $('.pileBottom > p').html(cardValue);
            $('#gameLog').prepend('<p>Player flipped the ' + cardValue + '.')


          });
      } //end stop
    } //end draggable properties
  ); //end draggable





}); // end ready