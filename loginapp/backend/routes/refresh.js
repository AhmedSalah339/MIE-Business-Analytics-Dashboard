var express = require('express');
var router = express.Router();
const refresh = require('../controllers/refresh');
/* GET home page. */
router.get('/', refresh.refresh);

module.exports = router;
