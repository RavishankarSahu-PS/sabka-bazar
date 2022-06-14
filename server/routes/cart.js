var express = require('express');
var router = express.Router();

const cart = [];
/* GET cart data */
router.get('/', function(req, res, next) {
  res.json(cart);
});

module.exports = router;