const Task = require("../models/taskModel");
const List = require("../models/listModel");
const Board = require("../models/boardModel");
const Project = require("../models/projectModel");

//  CREATE TASK
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const list_id = req.query.list_id;
  const board_id = req.query.board_id;
  const user_id = req.user._id;

  try {
    //const list = await List.findById(list_id)

    const data = await Task.create({
      title,
      description,
      participants: [user_id],
      list_id: list_id,
      board_id: board_id,
    });

    if (data) {
      // Update the associated list with the new task's ID
      await List.findByIdAndUpdate(
        list_id,
        { $push: { tasks: data._id } },
        { new: true }
      );

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  GET PROJECT's TASKS
const getAllBoardTasks = async (req, res) => {
  const board_id = req.query.board_id;

  try {
    const data = await Task.find({ board_id: board_id });

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET USERS TASKS

const getUserTasks = async (req, res) => {
  const user_id = req.user._id;

  try {
    const tasks = await Task.find({ participants: user_id });

    const detailedTasks = await Promise.all(
      tasks.map(async (task) => {
        const list = await List.findById(task.list_id);
        const board = await Board.findById(task.board_id);
        const board_id = board._id;
        const project = await Project.findOne({ board_id });

        return {
          _id: task._id,
          project_id: project ? project._id : null,
          title: task.title,
          description: task.description,
          project_title: board ? board.title : null,
          list_title: list ? list.title : null,
        };
      })
    );

    res.status(200).json(detailedTasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  GET TASK BY ID
const getTaskById = async (req, res) => {
  const task_id = req.query.task_id;

  try {
    const task = await Task.findById(task_id);

    if (!task || task.length === 0) {
      return res.status(200).json({ status: 0 });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  JOIN TASK
const joinTask = async (req, res) => {
  const user_id = req.user._id;
  const task_id = req.query.task_id;

  try {
    const task = await Task.findById(task_id);

    if (!task) {
      return res.status(404).json({ status: 0 });
    }

    if (task.participants.includes(user_id)) {
      return res.status(200).json({ status: 0 });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      task_id,
      { $push: { participants: user_id } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ status: 0 });
    }

    return res.status(200).json({ status: 1 });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//    LEAVE TASK
const leaveTask = async (req, res) => {
  const user_id = req.user._id;
  const task_id = req.query.task_id;

  try {
    const task = await Task.findById(task_id);

    if (!task) {
      res.status(404).json({ status: 0 });
      return;
    }

    if (!task.participants.includes(user_id)) {
      res.status(200).json({ status: 0 });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      { _id: task_id },
      { $pull: { participants: user_id } },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ status: 0 });
    } else {
      res.status(200).json({ status: 1 });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//  DELETE TASK
const deleteTask = async (req, res) => {
  const task_id = req.query.task_id;

  try {
    const task = await Task.findByIdAndDelete(task_id);

    if (!task) {
      return res.status(404).json({ status: 0 });
    }

    await List.findByIdAndUpdate(
      list_id,
      { $pull: { tasks: task_id } },
      { new: true }
    );

    res.status(200).json({ status: 1 });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//get participants

const taskParticipants = async (req, res) => {
  const task_id = req.query.task_id;

  try {
    const task = await Task.findById(task_id);

    if (!task) {
      return res.status(200).json({ status: 0 });
    }

    const participants = task.participants;

    res.status(200).json({ participants });
  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({ error: error.message });
  }
};

module.exports = { taskParticipants };

//EDIT task

const updateTask = async (req, res) => {
  const task_id = req.query.task_id;
  const { title, description } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(task_id, {
      title: title,
      description: description,
    });

    res.status(200).json({ task });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const moveTask = async (req, res) => {
  const task_id = req.query.task_id;
  const new_list_id = req.query.list_id;

  try {
    const taskToMove = await Task.findById(task_id);

    if (!taskToMove) {
      return res.status(404).json({ status: 0, error: "Task not found" });
    }

    const current_list_id = taskToMove.list_id;

    await Task.findByIdAndUpdate(task_id, { list_id: new_list_id });

    await List.findByIdAndUpdate(
      current_list_id,
      { $pull: { tasks: task_id } },
      { new: true }
    );

    await List.findByIdAndUpdate(
      new_list_id,
      { $push: { tasks: task_id } },
      { new: true }
    );

    res.status(200).send("Task moved successfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = { moveTask };

module.exports = {
  createTask,
  getAllBoardTasks,
  getTaskById,
  joinTask,
  leaveTask,
  deleteTask,
  updateTask,
  getUserTasks,
  taskParticipants,
  moveTask,
};
