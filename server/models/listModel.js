const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
