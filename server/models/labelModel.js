const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const labelSchema = new Schema({
  color: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Label", labelSchema);
