/**
 * Module dependencies
 */

var http = require('http'),
    path = require('path'),
    morgan = require('morgan'),
    errorhandler = require('errorhandler'),
    Passport = require('passport'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    Authorization = require('./config/authorization'),
    PassportProvider = require('./lib/service/passport/passportProvider'),
    twitterStrategy = require('./lib/service/passport/twitterStrategy');

var express = require('express');
var app     = express();
var port    = 	process.env.PORT || 8080;


var defaultRouter = express.Router();

/**
 * Configuration
 */
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({secret: 'keyboard cat' }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(Passport.initialize());
app.use(Passport.session())
app.use(express.static(path.join(__dirname, '..', 'webclient')));

// development only
if (app.get('env') === 'development') {
    app.use(errorhandler());
};

// production only
if (app.get('env') === 'production') {
    // TODO
};

PassportProvider.configure(Passport, twitterStrategy.strategy(Authorization.twitterAuth));

var multappRouter = require('./routes/multapp.js');
var routes = require('./routes/routes.js')(app,Passport);

// Routes

defaultRouter.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.use('/multapp', multappRouter);


/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});