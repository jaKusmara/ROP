const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
