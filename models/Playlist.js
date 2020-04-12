const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PlaylistSchema = new Schema({
  playlistname: [{
    name: String,
    songs: Array
  }],
  favoriteplaylists: [{
    name: String,
    songs: Array
  }],
  favoritesongs: Array
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
