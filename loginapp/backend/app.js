var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var indexRouter = require('./routes/index');
var welcomeRouter = require('./routes/welcome');
var unauthorizedRouter = require('./routes/unauth');
var getEmbedToken = require('./routes/getEmbedToken');
var refresh = require('./routes/refresh');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/welcome', welcomeRouter);
app.use('/unauthorized', unauthorizedRouter);
app.use('/getEmbedToken', getEmbedToken);
app.use('/refresh', refresh);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// jwt checking
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-8tto1d7k.eu.auth0.com/.well-known/jwks.json'
}),
audience: 'BI',
issuer: 'https://dev-8tto1d7k.eu.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);
module.exports = app;
