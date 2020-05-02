const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes")
const session = require("express-session");
const passport = require("./passport");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoStore = require('connect-mongo')(session)

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

//your local database url
//27017 is the default mongoDB port
const uri = 'mongodb://localhost:27017/usersdirectory' 

var dbConnection = mongoose.connect(uri).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );

// We need to use sessions to keep track of our user's login status
app.use(session({
  secret: "supersecretpassword",
  // store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(routes);

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/usersdirectory");

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
