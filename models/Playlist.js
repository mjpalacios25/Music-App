const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PlaylistSchema = new Schema({
  
    name: {
      type: String, 
      trim: true,
      required: true,
      unique: true
    },
    songs: {
      type: Array
    }
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
