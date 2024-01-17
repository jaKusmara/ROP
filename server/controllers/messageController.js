const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const Channel = require("../models/channelModel");
var crypto = require("crypto");

const sendMessage = async (req, res) => {
  const chat_id = req.query.chat_id;
  const content = req.body.content;
  const sender_id = req.user._id;

  try {
    let cipher = crypto.createCipher("aes-256-cbc", process.env.SECRET);
    let crypted = cipher.update(content, "utf8", "hex");
    crypted += cipher.final("hex");

    const message = await Message.create({
      content: crypted,
      sender_id: sender_id,
      chat_id: chat_id,
    });

    res.status(200).json(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllMessages = async (req, res) => {
  const chat_id = req.query.chat_id;

  try {
    // Assuming you have the appropriate models imported
    const messages = await Message.find({ chat_id });

    // Decrypt each message
    const decryptedMessages = messages.map((message) => {
      const decipher = crypto.createDecipher("aes-256-cbc", process.env.SECRET);
      let decrypted = decipher.update(message.content, "hex", "utf8");
      decrypted += decipher.final("utf8");

      // Replace the encrypted content with decrypted content
      return {
        ...message.toObject(),
        content: decrypted,
      };
    });

    res.status(200).json(decryptedMessages);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { sendMessage, getAllMessages };
