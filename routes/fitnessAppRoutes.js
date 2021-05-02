const express = require('express');
const router = express.Router();
const controller = require("../Controllers/fitnessAppController")
const auth = require("../auth/auth");
const {ensureLoggedIn} = require('connect-ensure-login');
module.exports= router;


router.get("/", controller.show_landing_page);

router.get("/:user", controller.show_home_page);

router.get("/:user/achievements", controller.show_achievements);

router.get("/logout", controller.logout);

router.post("/register", controller.post_register);

router.post("/login", auth.authorize("/"),
controller.post_login);

router.post("/:user/addActivity", controller.post_new_activity);

router.get("/:user/showActivities", controller.show_all_activities);

router.post("/:user/removeActivity", controller.remove_activity);

router.post("/:user/updateActivity", controller.update_activity)

router.post("/:user/completeActivity", controller.complete_activity)




router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})

