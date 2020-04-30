const User = require("../models/User");
const passport = require("../passport")
const express = require("express");


module.exports = {
    findAll: function(req, res) {
        User
            .find(req.query)
            .populate("playlists") //popuplates each user with playlist data
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    findbyID: function(req, res){
        User
            .findById(req.params.id)
            .populate("playlists") //populates a specific user with playlist data
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err))
    },
    create: function(req, res){
        console.log("register user")
        console.log("at controller " + JSON.stringify( req.body ));
        const { username, password } = req.body;
        //add validation
        
        User.findOne({ username: username }, (err, user, next) => {
            if (err) {
                console.log("User.js post error: ", err);
            }
            else if (user) {
                res.json({
                    error: "Sorry, already a user with that username"
                })

            }
            else {
                const newUser = new User({
                username: username,
                password: password
            
        });
        newUser
            .save((err, savedUser) => {
                if (err) {
                    return res.json(err)
                }
                else {
                    res.json(savedUser)
                    
                }
        })
            }
        })
        
            // .then(dbUser => res.json(dbUser))
            // .catch(err => res.status(422).json(err))
    },
    update: function (req, res) {
        User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
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
                console.log("logged in " + JSON.stringify( req.body));
                var userInfo = {
                    username: req.username
            };
            res.send(userInfo);
        })
    
     
};