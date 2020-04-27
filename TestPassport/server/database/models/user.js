const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise

// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");

// Define userSchema
const userSchema = new Schema({

    username: { type: String, unique: true, required: true },
	password: { type: String, unique: false, required: true }

})

// Define schema methods
userSchema.methods = {
	validPassword: function (password) {
		return bcrypt.compareSync(password, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User