const Channel = require("../models/channelModel");
const Project = require("../models/projectModel");

//  CREATE CHANNEL
const createChannel = async (req, res) => {
  const { title } = req.body;
  const project_id = req.query.project_id;
  const user_id = req.user._id;

  try {
    const project = await Project.findById(project_id);

    if (project) {
      const channel = await Channel.create({
        members: [user_id],
        title,
        type: "text",
        project_id: project_id,
      });

      if (channel) {
        const updatedProject = await Project.findByIdAndUpdate(
          project_id,
          { $push: { channels: channel._id } },
          { new: true }
        );

        if (updatedProject) {
          res.status(200).json(channel);
        }
      }
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
  const channel_id = req.query.channel_id;

  try {
    const deletedChannel = await Channel.findByIdAndDelete(channel_id);

    res.status(200).json(deletedChannel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editChannelTitle = async (req, res) => {
  const { channel_id, title } = req.query;

  try {
    const channel = await Channel.findByIdAndUpdate(channel_id, {
      title: title,
    });

    res.status(200).json(title);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


module.exports = {
  createChannel,
  deleteChannel,
  getChannel,
  editChannelTitle
};
