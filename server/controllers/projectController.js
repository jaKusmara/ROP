const Channel = require("../models/channelModel");
const Project = require("../models/projectModel");
const Board = require("../models/boardModel");
const Task = require("../models/taskModel");

// CREATE PROJECT
const createProject = async (req, res) => {
  const { title, description } = req.body;
  const user_id = req.user._id;

  try {
    console.log(user_id);
    const project = await Project.createNewProject(user_id, title, description);

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET PROJECTS FOR A USER
const getAllUserProjects = async (req, res) => {
  const user_id = req.user;

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
    res.status(404).json({ error: error.message });
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

    const tasks = await Task.updateMany(
      {
        participants: user_id,
        board_id: project.board_id,
      },
      { $pull: { participants: user_id } }
    );
    console.log(tasks.matchedCount);
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

const editProjectTitle = async (req, res) => {
  const { project_id, title } = req.query;

  try {
    const project = await Project.findByIdAndUpdate(project_id, {
      title: title,
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const editProjectDescription = async (req, res) => {
  const { project_id, description } = req.query;

  try {
    const project = await Project.findByIdAndUpdate(project_id, {
      description: description,
    });
    res.status(200).json(project);
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
  editProjectTitle,
  editProjectDescription,
};
