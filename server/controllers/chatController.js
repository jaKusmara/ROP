const Chat = require("../models/chatModel");

const useChat = async (req, res) => {
  const receiver_id = req.query.receiver_id;
  const sender_id = req.user._id;

  try {
    let data;

    data = await Chat.findOne({
      members: { $all: [receiver_id, sender_id] },
    });

    if (!data) {
      data = await Chat.create({
        members: [sender_id, receiver_id],
      });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in useChat:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { useChat };
