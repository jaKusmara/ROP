const Message = require('../models/messageModel');
const Channel = require('../models/channelModel')

const sendMessage = async (req, res) => {
    const channel_id = req.body.channel_id;
    const chat_id = req.body.chat_id;
    const content = req.body.content;
    const sender_id = req.user._id; 

    try {
        let message;

        if (channel_id) {
            message = await Message.create({ content, sender_id });

            const updatedChannel = await Channel.findByIdAndUpdate(
                channel_id,
                { $push: { messages: message._id } },
                { new: true }
            );

            if (updatedChannel) {
                return res.status(200).json({ message: "Message sent successfully" });
            }
        } else if (chat_id) {
            message = await Message.create({ content, sender_id });
        }

        if (message) {
            return res.status(200).json({ message: "Message sent successfully" });
        } else {
            return res.status(500).json({ message: "Message creation failed" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { sendMessage };
