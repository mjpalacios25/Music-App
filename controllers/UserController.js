const db = require("../models");
const passport = require("../passport")


module.exports = {
    findAll: function(req, res) {
        db.User
            .find(req.query)
            .populate("playlists") //popuplates each user with playlist data
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    findbyID: function(req, res){
        db.User
            .findById(req.params.id)
            .populate("playlists") //populates a specific user with playlist data
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    create: function(req, res){
        db.User
            .create(req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    update: function (req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    //validates to see if user name is available
    validate: function (req, res, next) {
        db.User
            .findOne({ username: req.username }, (err, user) => {
                if (err) {
                    console.log("User.js post error: ", err);
                }
                else if (user) {
                    res.json({
                        error: "Sorry, already a user with that username"
                    })
                }
                else {
                    next();
                }
            })
    },
    //logs user out from session
    logout: function (req, res) {
        if (req,user) {
            req.logout()
            res.json({ msg: "logging out" })
        }
        else {
            res.json({ msg: "no user to log out" })
        }
    },
    //if user is logged in, grants access to restricted pages
    loggedIn: function (req, res) {
        console.log("=====user!=====")
        console.log(req.user)
        if (req.user) {
            res.json({ user: req.user })
        }
        else {
            res.json({ user: null })
        }
    },
    //if the user had valid login credentials, send them to their profile page.
    //Otherwise return user to home page
    logIn: (function (req, res, next) {
                console.log("user login, req.body: ");
                console.log(req.body)
                next()
            },
            passport.authenticate("local"),
            (req, res) => {
                console.log("logged in", req.user);
                var userInfo = {
                    username: req.user.username
            };
            res.send(userInfo);
        })
    
     
};