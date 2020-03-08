var express = require('express');
var request = require('request');

var MessageProcessor = require('../helpers/message-processor');

var router = express.Router();
var messageProcessor = new MessageProcessor();

const SEND_API = 'https://graph.facebook.com/v2.6/me/messages';
const SEND_TOKEN = 'EAAlC4HKTV5IBAEc7fqWOlCMAvk61oCumRP5IZACuPJdccelgAPZAmiRZCvZBdsTuODy7NgLrdz3FmdvancAecQlfcKj9Iq3ZCwYaZA6LDti3vTcSlpq1MeX8luA60Pj8GOfZChlaHxqEqHLuwsYkMpDi6EkugBKShZAndgGPNwErjgZDZD';
const VERIFY_TOKEN = '123456asasas';

router.get('/', function (req, res, next) {
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

router.post('/', function (req, res, next) {
  let body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(function (entry) {
      let webhookEvent = entry.messaging[0];
      console.log("new event:", webhookEvent);
      var senderId = webhookEvent.sender.id;
      if (webhookEvent.message) {
        var content = webhookEvent.message;
        var response = messageProcessor.process(content, senderId);
        console.log(webhookEvent);
        if (response) sendMessage(senderId, response);
      }

    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

function sendMessage(recipientId, content) {
  var responseBody = {
    "recipient": {
      "id": recipientId
    },
    "message": content
  }
  request({
    "url": SEND_API,
    "qs": { "access_token": SEND_TOKEN },
    "method": "post",
    "json": responseBody
  }, function (err, res, body) {
    if (!err) {
      console.log("response sent: ");
    } else {
      console.log("error occurred");
    }
  });
};

module.exports = router;
