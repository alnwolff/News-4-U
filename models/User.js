const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true
  },
  password: String,
  interests: [ String ],
  // readLater: [ String ]
  readLater: [{
		type: Schema.Types.ObjectId,
		ref: 'Article' 
	}],
});

const User = model("User", userSchema);

module.exports = User;
