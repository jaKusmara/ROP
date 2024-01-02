const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const Channel = require("../models/channelModel");
var crypto = require("crypto");

const sendMessage = async (req, res) => {
  const chat_id = req.query.chat_id;
  const content = req.body.content;
  const sender_id = req.user._id;

  try {
    const chat = await Chat.findById(chat_id);
    const channel = await Channel.findById(chat_id);

    if (!chat && !channel) {
      return res.status(404).json({ error: "Chat not found" });
    }

    let cipher = crypto.createCipher("aes-256-cbc", process.env.SECRET);
    let crypted = cipher.update(content, "utf8", "hex");
    crypted += cipher.final("hex");

    const message = await Message.create({
      content: crypted,
      sender_id: sender_id,
    });

    if (chat) {
      chat.messages.push(message._id);
      await chat.save();
    }

    if (channel) {
      channel.messages.push(message._id);
      await channel.save();
    }

    res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllMessages = async (req, res) => {
  const chat_id = req.query.chat_id;

  try {
    let messages;

    const chat = await Chat.findById(chat_id).populate("messages");
    const channel = await Channel.findById(chat_id).populate("messages");

    if (!chat && !channel) {
      return res.status(404).json({ error: "Chat not found" });
    }

    if (chat) {
      messages = chat.messages;
    }

    if (channel) {
      messages = channel.messages;
    }

    // Decrypt all messages
    const decryptedMessages = messages.map((message) => {
      let decipher = crypto.createDecipher("aes-256-cbc", process.env.SECRET);

      let decryptedContent = decipher.update(message.content, "hex", "utf8");
      decryptedContent += decipher.final("utf8");

      return {
        _id: message._id,
        content: decryptedContent,
        sender_id: message.sender_id,
        createdAt: message.createdAt,
      };
    });

    res.status(200).json(decryptedMessages);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { sendMessage, getAllMessages };
