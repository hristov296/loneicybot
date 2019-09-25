const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Create Schema
const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  channel_id: {
    type: Number,
    required: true,
  },
  msg_rate: {
    type: Number,
    default: 10,
  },
  min_rate: {
    type: Number,
    default: 60,
  },
  user_id: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = Channel = mongoose.model("channels", ChannelSchema);
