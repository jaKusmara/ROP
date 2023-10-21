const Chat = require("../models/chatModel");

const useChat = async (req, res) => {
  const chatRoom_id = req.body.chatRoom_id;
  const receiver_id = req.body.receiver_id;
  const sender_id = req.user._id;

  try {
    const chatRoom = await Chat.findById(chatRoom_id);

    if (!chatRoom) {
      const newChatRoom = await Chat.create({
        sender: sender_id,
        receiver: receiver_id,
      });

      res.status(201).json(newChatRoom);
    } else {
      res.status(200).json(chatRoom);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { useChat };
