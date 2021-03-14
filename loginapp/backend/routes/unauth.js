var express = require('express');
var router = express.Router();
const unauth = require('../controllers/unauth');
/* GET home page. */
router.get('/', unauth.unauth);

module.exports = router;
