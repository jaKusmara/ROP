const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const useChat = async (req, res) => {
  const receiver_id = req.query.receiver_id;
  const sender_id = req.user._id;

  try {
    let chat;

    chat = await Chat.findOne({
      members: { $all: [receiver_id, sender_id] },
    });

    if (!chat) {
      chat = await Chat.create({
        members: [sender_id, receiver_id],
      });
    }

    const receiver = await User.findById(receiver_id);

    res.status(200).json({ chat, receiver });
  } catch (error) {
    console.error("Error in useChat:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { useChat };
