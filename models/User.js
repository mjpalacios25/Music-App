const mongoose = require("mongoose");
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");

// Define userSchema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
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

// Define schema methods
UserSchema.methods = {
	validPassword: function (password) {
		return bcrypt.compareSync(password, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
UserSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
