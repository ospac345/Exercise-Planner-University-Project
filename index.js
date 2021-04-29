const express = require('express');
const app = express();
const path = require('path');
const mustache = require('mustache-express');
const auth = require("./auth/auth");
const passport = require('passport');
const session = require('express-session');
const router = require('./routes/fitnessAppRoutes');
//const bodyParser = require("body-parser");


app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const public = path.join(__dirname, 'public');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

//app.use(bodyParser.urlencoded({extended: false}));

app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

auth.init(app);



app.use('/', router);






app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})