//Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const passport = require("./passport");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)


//Requiring passport as we've configured it
// const initializePassport = require("./config/passport-config");
// initializePassport(passport);

//Setting up port
// var PORT = process.env.PORT || 8080;
var PORT = 8080;

//Creating express app and configuring middleware needed for authentication
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// We need to use sessions to keep track of our user's login status
app.use(session({
    secret: "supersecretpassword",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Requiring our routes
const user = require("./routes/user");
app.use("/user", user)


// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/users");


// Start the server
app.listen(PORT, function() {
    console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
  });




