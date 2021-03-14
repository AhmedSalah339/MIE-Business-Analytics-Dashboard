// main controller
var CONFIG = require('../config.json');
module.exports.home = function(req,res){
    res.render('index', { title: 'MIE BI',DOMAIN:CONFIG.DOMAIN, API_IDENTIFIER:CONFIG.API_IDENTIFIER,CLIENT_ID:CONFIG.CLIENT_ID,CALLBACK_URI:'http://localhost:3000/welcome',STATE:'ready'});
}