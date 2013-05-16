$(document).ready(function() {

  $('#startButton').click(function() {
    $.post("/", $('form').serialize(), function(ajaxResponse) {

      if (typeof ajaxResponse.pile !== 'undefined')
      {
        $('#pileStatus > h2').html('Current<br/>Pile Size: ' + ajaxResponse.pile.length);
        console.log('The pile has ' + ajaxResponse.pile.length + ' cards currently.')

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
        $.post("/turn", {action:"dropped"}, function(ajaxResponse) {
          console.log('turn: ' + ajaxResponse.pile)
          if (ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) == '11') {
            ajaxResponse.pile = 'J' + ajaxResponse.pile.substring(ajaxResponse.pile.length - 1,ajaxResponse.pile.length)
          }
          if (ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) == '12') {
            ajaxResponse.pile = 'Q' + ajaxResponse.pile.substring(ajaxResponse.pile.length - 1,ajaxResponse.pile.length)
          }
          if (ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) == '13') {
            ajaxResponse.pile = 'K' + ajaxResponse.pile.substring(ajaxResponse.pile.length - 1,ajaxResponse.pile.length)
          }
          if (ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) == '1') {
            ajaxResponse.pile = 'A' + ajaxResponse.pile.substring(ajaxResponse.pile.length - 1,ajaxResponse.pile.length)
          }
          if (ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) == '14' ||
              ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) == '15') {
            ajaxResponse.pile = 'J'
          }

          switch(ajaxResponse.pile.substring(ajaxResponse.pile.length - 1,ajaxResponse.pile.length))
          {
            case 'S':
              ajaxResponse.pile = ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) + '&spades;'
              break
            case 'H':
              ajaxResponse.pile = ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) + '&hearts;'
              break
            case 'C':
              ajaxResponse.pile = ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) + '&clubs;'
              break
            case 'D':
              ajaxResponse.pile = ajaxResponse.pile.substring(0,ajaxResponse.pile.length - 1) + '&diams;'
              break
            // case 'J':
            //   ajaxResponse.pile = '<strong>J</strong>'
          }

            //console.log(ajaxResponse.pile)
            $('.pile').css("background-color","#fdffdd");
            $('.pileTop > p').html(ajaxResponse.pile);
            $('.pileBottom > p').html(ajaxResponse.pile);
            $('#gameLog').prepend('<p>Player flipped the ' + ajaxResponse.pile + '.')


          });
      } //end stop
    } //end draggable properties
  ); //end draggable





}); // end ready