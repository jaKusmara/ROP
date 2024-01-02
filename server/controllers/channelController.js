const Channel = require("../models/channelModel");
const Project = require("../models/projectModel");

//  CREATE CHANNEL
const createChannel = async (req, res) => {
  const { title } = req.body;
  const user_id = req.user._id;

  try {
    const channel = await Channel.create({
      members: [user_id],
      title,
      type: "text",
      project_id: project_id,
    });

    const updatedProject = await Project.findByIdAndUpdate(
      project_id,
      { $push: { channels: channel._id } },
      { new: true }
    );

    if (!updatedProject) {
      res.status(201).json({ message: "Bad project_id" });
    }

    if (!channel) {
      res.status(201).json({ message: "Channel creation failed" });
    } else {
      res
        .status(200)
        .json({ message: "Channel created successfully", channel });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET CHANNEL
const getChannel = async (req, res) => {
  const channel_id = req.query.channel_id;

  try {
    const data = await Channel.findById(channel_id);

    if (!data) {
      res.status(404).json("Channel not found");
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//  DELETE CHANNEL
const deleteChannel = async (req, res) => {
  const channel_id = req.body.channel_id;

  try {
    const deletedChannel = await Channel.deleteOne({ _id: channel_id });

    if (deletedChannel.deletedCount === 1) {
      res.status(200).json({ message: "Channel deleted successfully" });
    } else {
      res.status(404).json({ error: "Channel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChannel,
  deleteChannel,
  getChannel
};
