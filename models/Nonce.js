const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const NonceSchema = new Schema({
  nonce: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900,
  },
});

module.exports = Nonce = mongoose.model("nonces", NonceSchema);
