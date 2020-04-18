const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/usersdirectory"
);

const userSeed = [{
    username: "mojeezy",
    password: "testpassword",
    profilepic: 1234,
    friends: ["chris", "mark", "sandip", "jessica", "lolita"]
},
{
    username: "karen2.0",
    password: "karenpassword",
    profilepic: 1234,
    friends: ["mike", "steve", "george", "katherine", "tom"]
}
]