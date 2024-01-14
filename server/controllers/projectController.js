const Channel = require("../models/channelModel");
const Project = require("../models/projectModel");
const Board = require("../models/boardModel");
const randomToken = require("random-token").create(
  "abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
);

// CREATE PROJECT
const createProject = async (req, res) => {
  const { title, description } = req.body;
  const user_id = req.user._id;

  try {
    const connectionString = randomToken(8);

    const board = await Board.create({ title: title });

    // Create a new project
    const data = await Project.create({
      members: [{ user_id }],
      title,
      description,
      connectionString,
      board_id: board._id,
      channels: [],
    });

    const channel = await Channel.create({
      members: [user_id],
      title: "General",
      project_id: data._id,
      type: "general",
    });

    await Project.findByIdAndUpdate(
      data._id,
      { $push: { channels: channel._id } },
      { new: true }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET PROJECTS FOR A USER
const getAllUserProjects = async (req, res) => {
  const user_id = req.user;

  if (user_id) {
    console.log(user_id);
  }
  try {
    const data = await Project.getUserProjects(user_id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  GET PROJECT BY ID

const getProjectById = async (req, res) => {
  const _id = req.query._id;

  try {
    const data = await Project.getProjectById(_id);

    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

// JOIN PROJECT
const joinProject = async (req, res) => {
  const connectionString = req.query.connectionString;
  const user_id = req.user._id;

  try {
    const updatedProject = await Project.findOneAndUpdate(
      {
        connectionString: connectionString,
        "members.user_id": { $ne: user_id },
      },
      { $push: { members: { user_id: user_id } } },
      { new: true }
    );

    if (!updatedProject) {
      return res
        .status(404)
        .json({ error: "Project not found or user is already a member" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LEAVE PROJECT
const leaveProject = async (req, res) => {
  const project_id = req.query.project_id;
  const user_id = req.user._id;

  try {
    const project = await Project.findOne({
      _id: project_id,
      "members.user_id": user_id,
    });

    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found or user not a member" });
    }

    project.members = project.members.filter(
      (member) => member.user_id.toString() !== user_id.toString()
    );

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  DELETE PROJECT
const deleteProject = async (req, res) => {
  const project_id = req.query.project_id;

  try {
    const deletedProject = await Project.deleteOne({ _id: project_id });

    if (deletedProject.deletedCount === 1) {
      res.status(200).json({ message: "Project deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Project not found or could not be deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PROJECT CHANNEL
const getAllProjectChannels = async (req, res) => {
  const project_id = req.query.project_id;

  try {
    const data = await Project.getAllProjectChannels(project_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getAllUserProjects,
  getProjectById,
  joinProject,
  leaveProject,
  deleteProject,
  getAllProjectChannels,
};
