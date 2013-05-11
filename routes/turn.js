
/*
 * GET home page.
 */

exports.turn = function(req, res){
	//console.log(res.locals.hand)
  res.render('index', { 
  	title: 'Express',
  	pile: res.locals.pile,
  	hand: res.locals.hand });
};