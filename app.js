var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var webhookRouter = require('./routes/webhook');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webhook', webhookRouter);

// var request = require('request');
// const SEND_API = 'https://graph.facebook.com/v2.6/me/messages';
// const SEND_TOKEN = 'EAAlC4HKTV5IBAEc7fqWOlCMAvk61oCumRP5IZACuPJdccelgAPZAmiRZCvZBdsTuODy7NgLrdz3FmdvancAecQlfcKj9Iq3ZCwYaZA6LDti3vTcSlpq1MeX8luA60Pj8GOfZChlaHxqEqHLuwsYkMpDi6EkugBKShZAndgGPNwErjgZDZD';
// const VERIFY_TOKEN = '123456asasas';
// var data = {
//   "greeting":[
//     {
//       "locale":"default",
//       "text":"Hello {{user_first_name}}!"
//     }
//   ]
// };
// request({
//   "url": SEND_API,
//   "qs": { "access_token": SEND_TOKEN },
//   "method": "post",
//   "json": data
// }, function (err, res, body) {
//   if (!err) {
//     console.log("response sent: ", body);
//   } else {
//     console.log("error occurred");
//   }
// });




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
