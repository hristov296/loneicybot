const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  displayName: {
    type: String,
  },
  picture: {
    type: String
  },
  email: {
    type: String,
  },
  twid: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
