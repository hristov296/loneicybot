const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChatterSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  channel: {
    type: String,
    required: true,
    ref: "Channel",
  },
});

module.exports = Chatter = mongoose.model("chatters", ChatterSchema);
