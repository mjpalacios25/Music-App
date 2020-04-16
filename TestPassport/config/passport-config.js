
const LocalStrategy = require("passport-local").Strategy

var User = require("../models/users");


function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        User.findOne({
            username: username  
        }, (err, user) => {
            if (err) {
                return done(err);
                }
            if (user == null ){
                return done(null, false, {message: "No user with that username"})
            }
            if (user.validPassword(password)){
                    return done(null, user)
            } else {
                return done(null, false, {message: "Incorrect Password"})
            }
           
        }
       )}

    passport.use(new LocalStrategy({ usernameField: "username" }, authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, {_id: user.id})
        }
    )
    passport.deserializeUser((id, done) => {
        User.findOne(
            { _id: id },
            "username",
            (err, user) => {
                console.log('*** Deserialize user, user:')
			    console.log(user)
			    console.log('--------------')
                done(null, user)
            }
        )
     })
}

module.exports = initialize