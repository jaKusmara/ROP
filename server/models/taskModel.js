const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  labels: [
    {
      color: {
        type: String,
      },
      text: {
        type: String,
      },
    },
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],
  list_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  board_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
