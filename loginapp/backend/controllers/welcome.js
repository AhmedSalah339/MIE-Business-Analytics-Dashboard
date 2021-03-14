// main controller
module.exports.welcome = function(req,res){
    // console.log(JSON.stringify(req.headers));
    res.render('welcome', { title: 'MIE BI'});
  
}