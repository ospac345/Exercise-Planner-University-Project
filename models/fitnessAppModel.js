const Datastore = require('nedb');
const path = require('path');


class FitnessApp {

    constructor(dbFilePath) {
        if(dbFilePath) {
            this.db = new Datastore({filename:path.join(__dirname, dbFilePath), autoload:true});
            console.log('DB connected to ', dbFilePath);
        } else {
            this.db = new Datastore();
            console.log('Db running in memory');
        } 
    }


    init() {
        this.db.insert({
            username: 'Clifford',
            title: 'Walking',
            startDate: '2020-02-16' ,
            duration: 15,
            completed: false
            });

        this.db.insert({
        username: 'faisal',
        title: 'Walking',
        startDate: '2020-02-16' ,
        duration: 15,
        completed: false
        });
    }


    addActivity(user,title, start, end, completed){
        var activityEntry = {
        user: user,
        title: title,
        start: start,
        end: end,
        completed: completed
    }
    console.log('schedule entry adding', activityEntry);

    this.db.insert(activityEntry, function(err, doc) {
        if (err) {
            console.log('Error inserting document', subject);
        }
    })
    }

    getActivitiesByUser(user) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'user': user }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                }
            });
        })
    }


    removeActivity(id) {
            this.db.remove({_id: id}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    
                }
            });
        }

    
    updateActivity(id, newTitle, newStart, newEnd) {
        this.db.update({_id: id }, { $set: { title: newTitle, start: newStart, end: newEnd } }, function (err, numReplaced) {
            console.log("replaced---->" + numReplaced);
          });
    }


    completeActivity(id) {
        this.db.update({_id: id }, { $set: { completed: "true" } }, function (err, numReplaced) {
            console.log("replaced---->" + numReplaced);
          });
    }


}



module.exports = FitnessApp;