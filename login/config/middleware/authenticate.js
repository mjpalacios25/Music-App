module.exports = {

checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("you are authenticated!")
        // next()
    }
    else{
    res.redirect("/login");
    }
},

checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/")
    }
    else {
        next()
    }
}
}