const express = require("express");
const router = express.Router();
const User = require("../database/models/user");
const passport = require("../passport");

// If the user has valid login credentials, send them to their profile page.
// Otherwise the user will be returned to login page 
router.post("/", 
    function (req, res, next) {
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

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our User Schema. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/register", 
    (req, res) => {
        console.log("register user");
        const { username, password } = req.body
        // Add validation
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('User.js post error: ', err)
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
                newUser.save(
                (err, savedUser) => {
                    if (err) {
                        return res.json(err)
                    }
                    else {
                        res.json(savedUser)
                    }
            }
            )
        }
    })

})

// if user is logged in already, pages requiring authentication will be shown
router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

//logs user out from session
router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router