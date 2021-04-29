const { response } = require('express');
const userDao = require('../models/userModel.js');
const fitnessAppDAO= require('../models/fitnessAppModel.js')
const db = new fitnessAppDAO('../activities.db');

exports.show_landing_page = function(req, res) {
    res.render("users/landingPage")
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

exports.post_new_activity = function(req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.title || !req.body.datetimes) {
        res.status(400).send("Entries must have a title and date.");
        return;
    }
    let user = req.user.user;
    console.log(req.user.user);
    db.addActivity(user, req.body.title, req.body.datetimes, req.body.duration, 'false');
    
    res.redirect('/'+user);
}


 
exports.post_login = function(req, res) {
    let user = req.user.user;
    console.log('post_login successful');
    res.redirect('/'+user);
};


// //Renders Home Page
// exports.show_home_page = function(req, res) {
//     let user = req.user.user;
// console.log(user);
//     db.getActivitiesByUser(user)
//     .then((entries) => {
//         console.log(entries);
//         res.json(entries);
//     })
//     .catch((err) => {
//         console.log('Error: ')
//         console.log(JSON.stringify(err))
//     });
//  };

exports.logout = function(req, res) {
    req.logout();
    res.redirect("/");
};



//Renders Home Page
exports.show_home_page = function(req, res) {
    let user = req.user;
    
    res.render('fitnessApp/schedule', {
        "userData": user
   });
 };


 