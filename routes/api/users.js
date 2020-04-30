const router = require("express").Router();
const usersController = require("../../controllers/UserController");
const passport = require("passport")

router.route("/")
    .get(usersController.findAll)
    // .post(usersController.validate, usersController.create)

router.post("/", function(req,res) {
    console.log("at api/users file " + JSON.stringify( req.body ))
    
        usersController.create(req,res)
    
})

router.route("/logout")
    .post(usersController.logout)

router.post("/login", function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
},
passport.authenticate('local'),
(req, res) => {
    console.log('logged in', req.user);
    var userInfo = {
        username: req.user.username
    };
    res.send(userInfo);
}
)

router.route("/profile")
    .get(usersController.loggedIn)

router.route("/:id")
    .get(usersController.findbyID)
    .delete(usersController.remove)
    .put(usersController.update)


module.exports = router;