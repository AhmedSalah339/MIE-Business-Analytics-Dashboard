var express = require('express');
var router = express.Router();

const welcomeController = require('../controllers/welcome');
/* GET users listing. */
router.get('/', welcomeController.welcome);

module.exports = router;
