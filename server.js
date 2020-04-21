const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });



db.User.create({
  username: "mojeezy",
  password: "testpassword",
  profilepic: 1234,
  friends: ["chris", "mark", "sandip", "jessica", "lolita"]
})
  .then(dbUser => {
    console.log(dbUser);
  })
  .catch(({ message }) => {
    console.log(message);
});

db.Playlist.create({
  playlistname: [{
    name: "chillin music",
    songs: ["happy", "i still believe", "hreatbreak", "falling"]
  },
  {
    name: "classical timewarp",
    songs: ["stankonia", "things change", "crawling"]
  }],
  favoriteplaylists: [{
    name: "driving music",
    songs: ["la llorona", "remember me", "coffee"]
  }],
  favoritesongs: ["modern love", "fire", "midnight sonata"]
})
  .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { playlists: _id } }, { new: true }))
  .then(dbPlaylist => {
    console.log(dbPlaylist);
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.get("/populateduser", (req, res) => {
  db.User.find({username: "mojeezy"})
    .populate("playlists")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(({ message }) => {
      console.log(message);
    })
  });



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
