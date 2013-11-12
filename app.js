/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var forever = require('forever');
var passport = require('passport');
app = express();


/* Routes files */
var indexRoute = require('./server/routes/index');
var userRoute = require('./server/routes/user');
var apiRoute = require('./server/routes/api');





// all environments
app.set('port', process.env.PORT || 3102);
app.set('secret', 'MySecret');
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/assets/img/favicon.ico', { maxAge: 2592000000 }));
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(app.get('secret')));
app.use(express.session());
app.use(function (req, res, next) {
    if (req.method == 'POST' && req.url == '/login') {
        req.session.cookie.maxAge = 2592000000;
    }
    next();
});
app.use(passport.initialize());
app.use(passport.session());


/* Angular.HTML5 Routes fix */

app.use(function(req, res, next) {
    if(req.url.match(/^\/assets\//) != null) {
        res.sendfile(path.join(__dirname,'/public', req.url));
    } else {
        next();
    }
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*ROUTES*/

Utils = require('./server/utils');
var pass = require(process.cwd()+'/server/config/passport');
//console.log(Utils.generateRandomToken());
//console.log(Utils.encryptPassword('123123'));

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
