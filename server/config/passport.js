var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    //, models = require('../models');




passport.use(new LocalStrategy(
    function (username, password, done) {
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
        var token = user.generateRandomToken();
        /*models.User.findOne({ accessToken: token }, function (err, existingUser) {
            if (err) {
                return done(err);
            }
            if (existingUser) {
                createAccessToken(); // Run the function again - the token has to be unique!
            } else {
                user.set('accessToken', token);
                user.save(function (err) {
                    if (err) return done(err);
                    return done(null, user.get('accessToken'));
                })
            }
        });*/
    };

    if (user._id) {
        createAccessToken();
    }
});

passport.deserializeUser(function (token, done) {
    /*models.User.findOne({accessToken: token }, function (err, user) {
        done(err, user);
    });*/
});

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}
