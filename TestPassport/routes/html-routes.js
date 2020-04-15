const path = require("path");
const authenticate = require("../config/middleware/authenticate.js")
const isAuthenticated = require("../config/middleware/isAuthenticated")

module.exports = function (app) {

app.get('/', function(req, res) {
    if (req.user) {
        res.redirect("/index.html");
      }
      res.sendFile(path.join(__dirname, "../public/login.html"));
    });

app.get("/login", authenticate.checkNotAuthenticated, function(req, res) {
    return res.redirect("/login.html");
})

app.get("/register", authenticate.checkNotAuthenticated, function(req, res) {
    return res.redirect("/register.html");
})
}