'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../controllers/decision');

router.get('/', controller.index);

module.exports = router;