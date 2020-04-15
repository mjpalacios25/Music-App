// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config()
// }


//Requiring necessary npm packages
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
//Requiring passport as we've configured it
const initializePassport = require("./config/passport-config");
initializePassport(passport);
// Setting up port
var PORT = process.env.PORT || 8080;

//Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(express.static("public"));
app.use(methodOverride("_method"))
// We need to use sessions to keep track of our user's login status
app.use(flash())
app.use(session({
    secret: "supersecretpassword",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/users");

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });




