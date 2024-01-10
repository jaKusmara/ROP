const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
