/**
 * Module dependencies
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    errorhandler = require('errorhandler'),
    Passport = require('passport'),
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
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride('X-HTTP-Method-Override'));
app.use(express.cookieParser());
app.use(express.session({secret: 'keyboard cat' }));
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

// Routes
var multapp = require('./routes/multapp.js')(app);
var routes = require('./routes/routes.js')(app,Passport);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});
app.use(app.router);
/**
 * Start Server
 */
/*app.get('/', routes);
app.get('/multapp', multapp);

app.post('/multapp', multapp);
*/

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});