const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true
  },
  password: String,
});

const User = model("User", userSchema);

module.exports = User;
