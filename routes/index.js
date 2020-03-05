var express = require('express');
var MessageProcessor = require('../helpers/message-processor');
var messageProcessor = new MessageProcessor();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(messageProcessor.process({text: "hello"}));
  res.render('index', { title: 'Express' });
});

module.exports = router;
