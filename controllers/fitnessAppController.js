const { response } = require('express');
const userDao = require('../models/userModel.js');


exports.show_landing_page = function(req, res) {
    res.render('users/landingPage');
 };

 exports.post_register = function(req, res) {
    const user = req.body.username;
    const password = req.body.registerPassword;
    const lName = req.body.lastName;
    const fName = req.body.firstName;
    const email = req.body.registerEmail;
    //console.log("register user", user, "password",  password);
    if (!user || !password) {
        res.send(401, 'no user or no password');
return; }
    userDao.lookup(user, function(err, u) {
        if (u) {
            res.send(401, "User exists:", user);
return; }
        userDao.create(user, password,lName, fName, email);
        res.redirect('/login');
    });
}
 
exports.post_login = function(req, res) {
    console.log('post_login successful');
    res.redirect('/home');
};
