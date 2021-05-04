const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const flash = require('connect-flash');

exports.init = function(app) {
    // setup password
    passport.use(new Strategy({
passReqToCallback: true,
    },
        function(req, username, password, cb) { // cb is callback
            userModel.lookup(username, function(err, user) {
                console.log('lookup', username);
                if (err) {
                    console.log('error looking up user', err);
                    return cb(err);
}
if (!user) {
                    console.log('user ', username, ' not found');
                    return cb(null, false, req.flash('errorUsername', 'user not found'));
                }
                //compare provided password with stored password
                bcrypt.compare(password, user.password,
                                            function(err, result) {
                    if (result) {
                        cb(null, user);
                    } else {
                        cb(null, false, req.flash('errorPassword', 'Incorrect Password!'));
} });
}); }));
    //For session handling we need serialize and deserialize users.
    //Simplest is just to use the 'username' field.
    passport.serializeUser(function(user, cb) {
        cb(null, user.user);
    });
    passport.deserializeUser(function(id, cb) {
        userModel.lookup(id, function(err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
});
app.use(passport.initialize());
app.use(passport.session());
};
exports.authorize = function(redirect) {
    return passport.authenticate('local', 
    { failureFlash: true,
        failureRedirect: redirect });
};


