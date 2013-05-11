$(document).ready(function() {

  $('.faceDownCard').draggable(
  	{ 
  		axis : "y",
  		helper : "clone",
  		containment : "#game",
      stop : function () {
        // check position of dragged card
        // be sure it's in Game Pile boundary
        
        // send topCard thru ajax - server will 'flip' to 'pile'
        $.post("/turn", {topPile : ajax[0], topCard : ajax[1]});


      }
    }
  	);

});