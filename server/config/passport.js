var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , Store = require('jfs')
    , uDb = new Store('./server/db/users.json')
    //, Utils = require(process.cwd()+'/server/utils');




//, models = require('../models');

//uDb.save('admin',{'username':'admin','password':Utils.encryptPassword('admin')});
uDb.get('admin', function(err,obj){
    //console.log('Err::',err, 'Obj::',obj);
});


passport.use(new LocalStrategy(
    function (username, password, done) {
        uDb.get(username, function(err, user){
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!Utils.comparePassword(password, user.password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
        /*models.User.findOne(
            {username: username},
            function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.comparePassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            }
        )*/
    }
));

passport.serializeUser(function (user, done) {
    var createAccessToken = function () {
        user.accessToken = Utils.generateRandomToken();
        uDb.save(user.username, user, function(err){
            if (err) return done(err);
            return done(null, user.accessToken);
        });
    };
    if (user) {
        createAccessToken();
    }
});

passport.deserializeUser(function (token, done) {
    uDb.all(function(err,users){
        for (key in users){
            //console.log(users[key]);
            if(users[key].accessToken == token){
                return done(err, users[key]);
            }
        }
        done(err,false);
    })
});

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}
