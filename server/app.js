/**
 * Module dependencies
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    errorhandler = require('errorhandler'),
    Passport = require('passport'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    Authorization = require('./config/authorization'),
    PassportProvider = require('./lib/service/passport/passportProvider'),
    twitterStrategy = require('./lib/service/passport/twitterStrategy');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(Passport.initialize());
app.use(Passport.session())
app.use(express.static(path.join(__dirname, '..', 'webclient')));

PassportProvider.configure(Passport, twitterStrategy.strategy(Authorization.twitterAuth));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  next();
};
 
app.use(allowCrossDomain); 

// development only
if (app.get('env') === 'development') {
    app.use(errorhandler());
};

// production only
if (app.get('env') === 'production') {
    // TODO
};

// Routes
var routes = require('./routes/routes.js')(app,Passport);
var multapp = require('./routes/multapp.js');
app.use('/multapp',multapp);
/**
 * Start Server
 */
 http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});