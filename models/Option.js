const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OptionSchema = new Schema({
  option_name: {
    type: String,
    required: true,
  },
  option_value: {
    type: String,
    required: true,
  },
});

module.exports = Option = mongoose.model("options", OptionSchema);
