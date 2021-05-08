const { response } = require('express');
const userDao = require('../models/userModel.js');
const fitnessAppDAO= require('../models/fitnessAppModel.js')
const db = new fitnessAppDAO('../activities.db');
const url = require('url');
const http = require('http');
const flash = require('connect-flash');


exports.show_landing_page = function(req, res) {
    const errors = req.flash() || [];
    console.log(errors);
    res.render("users/landingPage", {errors})
 };

 exports.post_login = function(req, res) {
    let user = req.user.user;
    res.redirect('/'+user);
};

 exports.post_register = function(req, res) {
    const user = req.body.username;
    const password = req.body.registerPassword;
    const lName = req.body.lastName;
    const fName = req.body.firstName;
    const email = req.body.registerEmail;
    
    if (!user || !password) {
        res.send(401, 'no user or no password');
return; }
    userDao.lookup(user, function(err, u) {
        if (u) {
            req.flash('errorUserExist', 'user already exist');
            res.redirect('/');
return;
}
        userDao.create(user, password,lName, fName, email);
        res.redirect('/register/success');
    });
}

exports.registration_success= function(req, res) {
    res.render("users/success");
}


exports.post_new_activity = function(req, res) {
    console.log('processing post-new_entry controller');
    console.log(req.body);
    if (!req.body.title || !req.body.start || !req.body.end) {
        res.status(400).send("Entries must have a title and date.");
        return;
    }
    let user = req.user.user;
    db.addActivity(user, req.body.title, req.body.start, req.body.end, 'false');
    
    res.redirect('/'+user);
}
 
// Retrieve All Activities
exports.show_all_activities = function(req, res) {
    let user = req.user.user;
    db.getActivitiesByUser(user)
    .then((entries) => {
       // console.log(entries);
        res.json(entries);
    })
    .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    });
 };

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

 //Renders Achievements Page
exports.show_achievements = function(req, res) {
    let user = req.user;
    res.render('fitnessApp/achievements', {
        "userData": user
   });
 };


 exports.remove_activity = function(req,res) {
   var id = req.body.id;
db.removeActivity(id);
 };


 //update Activity
exports.update_activity = function(req, res) {
    var id = req.body.id;
    var newTitle = req.body.newTitle;
    var newStart = req.body.newStart;
    var newEnd = req.body.newEnd;
    console.log(req.body);
    db.updateActivity(id, newTitle, newStart, newEnd);

};

exports.complete_activity = function(req, res) {
    var id = req.body.id;
    db.completeActivity(id);
}

exports.share_schedule = function(req,res) {
    console.log(req.params.user);
    var user = req.params.user;
    res.render("fitnessApp/share", {
        "user": user
    })
}

exports.show_share_activities = function(req, res) {
    console.log(req.params.user);
    console.log(req.params);
    db.getActivitiesByUser("simam202")
    .then((entries) => {
        res.json(entries);
    })
    .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    });
 };