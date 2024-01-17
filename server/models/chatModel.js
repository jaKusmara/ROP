const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
