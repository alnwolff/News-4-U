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
  readLater: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Article' 
    }
  ],
  imgPath: {
    type: String,
    default: 'https://res.cloudinary.com/di76jljny/image/upload/v1625748116/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta_ptk3pp.jpg'
  },
  imgName: {
    type: String,
    default: 'default-user-pic'
  },
  publicId: String,
});

const User = model("User", userSchema);

module.exports = User;
