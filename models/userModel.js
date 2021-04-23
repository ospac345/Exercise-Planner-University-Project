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
// for the demo the password is the bcrypt of the user name
init() {
this.db.insert({
    user: 'Peter',
password:'$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C' ,
    lastName: 'Shah',
    fisrtName: 'Peter',
    email: 'Peter@peter.com'
});
console.log('user record inserted in init');
this.db.insert({
    user: 'Ann',
    password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S',
    lastName: 'Aman',
    fisrtName: 'Ann',
    email: 'ann@ann.com'
});
console.log('user record inserted in init');
return this;
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
  // dao.init();
   module.exports = dao;
