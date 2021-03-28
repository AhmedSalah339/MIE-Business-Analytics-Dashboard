// main controller
const auth0 = require('auth0-js')

module.exports.welcome = function(req,res){
    // console.log(JSON.stringify(req.headers));
    

    res.render('welcome', { title: 'MIE BI'});
  
}