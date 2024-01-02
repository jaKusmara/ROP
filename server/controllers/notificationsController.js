const Notify = require("../models/notificationModel");
const User = require("../models/userModel");

const { io } = require('../index');

const newNotify = async (req, res) => {
  const { receiver_id } = req.body;
  const sender_id = req.user._id;

  try {
    const notify = await Notify.create({
      sender_id,
      receiver_id,
      notification: {
        type: "test",
        body: "sevas",
      },
    });

    if (notify) {
      const user = await User.findByIdAndUpdate(
        receiver_id,
        { $push: { notifications: notify._id } },
        { new: true }
      );


      o.to(receiver_id).emit('newNotification', notify);

      res.status(200).json({ message: "New notification", notify });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllNotifications = async (req, res) => {
  const user_id = req.user._id;
  try {
    const notifications = await Notify.find({
      receiver_id: user_id,
    });

    if (notifications) {
      res
        .status(200)
        .json({ message: "Successfully found all notifications", notifications });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { newNotify, getAllNotifications };
