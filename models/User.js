const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: true
  },
  profilepic: {
    type: Buffer,
    contentType: String
  },
  friends: Array 
  ,
  playlists: [
    {
      type: Schema.Types.ObjectId,
      ref: "Playlist"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
