var express = require('express');
var router = express.Router();
const getEmbedToken = require('../controllers/getEmbedToken');
/* GET home page. */
router.get('/', getEmbedToken.getEmbedToken);

module.exports = router;
