var User = require("../models/users");
var passport = require("passport");
const authenticate = require("../config/middleware/authenticate.js")
const isAuthenticated = require("../config/middleware/isAuthenticated")



module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error   
    app.post("/api/login", authenticate.checkNotAuthenticated, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }))
    
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our User Schema. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/register", authenticate.checkNotAuthenticated, function(req, res) {
        const { username, password } = req.body;
        //Add validation
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log("User.js post error: ", err)
            } else if (user) {
                res.json({
                    error: `Sorry, already a user with the username: ${username}`
                })
            }
            else {
                const newUser = new User({
                    username: username,
                    password: password
                })
                newUser.save((err, savedUser) => {
                    if(err) {
                        // res.json(err);
                        res.redirect("/register.html");
                    }
                    else {
                        // res.json(savedUser);
                        res.redirect("/login.html");
                    }
                })
                console.log(newUser);
            }
        })
       
        // console.log(JSON.stringify(req.body));
    }) 

    app.delete("/logout", function (req, res){
        req.logOut()
        res.redirect("/login")
    })

}