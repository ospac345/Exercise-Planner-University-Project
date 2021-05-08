const Datastore = require('nedb');
const path = require('path');
   const bcrypt = require('bcrypt');
   const saltRounds = 10;

   class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new Datastore({ filename:path.join(__dirname, dbFilePath), autoload: true });
} else {//in memory
    this.db = new Datastore();
}
}

create(username, password, lName, fName, email) {
const that = this;
bcrypt.hash(password, saltRounds).then(function(hash) {
    var entry = {
        user: username,
        password: hash,
        lastName: lName,
        firstName: fName,
        email: email
    };
    console.log('user entry is: ', entry);
    that.db.insert(entry, function (err) {
        if (err) {
            console.log("Can't insert user: ", username);
        }
}); });
}
lookup(user, cb) {
this.db.find({'user': user}, function (err, entries) {
    if (err) {
        return cb(null, null);
    } else {
        if (entries.length == 0) {
            return cb(null, null);
        }
        return cb(null, entries[0]);
    }
}); }
}
   const dao = new UserDAO('../users.db');
   module.exports = dao;
