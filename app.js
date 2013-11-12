/**
 * Module dependencies.
 */
/*
config = require('nconf');
config.argv()
    .env()
    .file({ file: process.cwd()+'/server/config/app.json' });
*/

var express = require('express');
var http = require('http');
var path = require('path');
var forever = require('forever');
var passport = require('passport');
var pass = require(process.cwd()+'/server/config/passport');
var app = express();

/* Routes files */
var indexRoute = require('./server/routes/index');
var userRoute = require('./server/routes/user');
var apiRoute = require('./server/routes/api');



// all environments
app.set('port', process.env.PORT || 3102);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/img/favicon.ico', { maxAge: 2592000000 }));
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
/*app.use(express.session({
    secret: config.get('security:secret'),
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(config.get('db'))}));*/
app.use(function (req, res, next) {
    if (req.method == 'POST' && req.url == '/login') {
        req.session.cookie.maxAge = 2592000000;
    }
    next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


/* Angular.HTML5 Routes fix */

app.use(function(req, res, next) {
    if(req.url.match(/^\/assets\//) != null) {
        res.sendfile(path.join(__dirname,'public/', req.url));
    } else {
        next();
    }
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*ROUTES*/


app.get('/', indexRoute.index);
/*app.get('#!/api/restartall', apiRoute.restartall);*/
app.get('/login', indexRoute.login);
app.post('/api/login', userRoute.postlogin);
app.post('/api/signup', apiRoute.signup);
app.get('/api/unit/restart/:uid' ,pass.ensureAuthenticated ,apiRoute.restartUnit);
app.get('/api/unit/stop/:uid' ,pass.ensureAuthenticated ,apiRoute.stopUnit);
app.post('/api/unit/cleanlog/' ,pass.ensureAuthenticated ,apiRoute.clearLogFile);
app.post('/api/unit/create' ,pass.ensureAuthenticated ,apiRoute.createUnit);
app.get('/api/unit/get/db/:uid' ,pass.ensureAuthenticated ,apiRoute.getUnitsFromDB);

app.get('/signup', indexRoute.signup);
app.get('/logout', userRoute.logout);

app.get('/api/get/instances/:uid' ,pass.ensureAuthenticated ,apiRoute.getInstances);
app.get('*', indexRoute.index);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
