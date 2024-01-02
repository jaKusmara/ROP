const Task = require("../models/taskModel");
const List = require("../models/listModel");
const Board = require("../models/boardModel");

//  CREATE TASK
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const boardList_id = req.query.boardList_id;
  const user_id = req.user._id;

  try {
    const data = await Task.create({
      title,
      description,
      participants: [user_id],
    });

    console.log(boardList_id)

    await List.findByIdAndUpdate(
      boardList_id,
      { $push: { tasks_id: data._id } },
      { new: true }
    );

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Task creation failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  GET PROJECT's TASKS
const getAllListTasks = async (req, res) => {
  const board_id = req.query.board_id;

  try {
    let listsAndTasks = [];

    const data = await Board.findById(board_id).populate("lists");

    const listPromises = data.lists.map(async (list) => {
      const listWithTasks = await List.findById(list._id).populate("tasks_id");
      return listWithTasks;
    });

    listsAndTasks = await Promise.all(listPromises);

    //console.log(listsAndTasks);
    res.json(listsAndTasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET USERS TASKS

const getUserTasks = async (req, res) => {
  const user_id = req.user._id;

  try {
    const tasks = await Task.find({ participants: user_id });

    if (tasks) {
      res.status(200).json({ message: "Successfully feched the tasks", tasks });
    } else {
      res.status(404).json({ message: "No tasks found for the user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  GET TASK BY ID
const getTaskById = async (req, res) => {
  const task_id = req.params.task_id;

  try {
    const task = await Task.findById(task_id);

    if (!task || task.length === 0) {
      res.status(200).json({ message: "No task found" });
    }

    res.status(200).json({ message: "Task find!", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  JOIN TASK
const joinTask = async (req, res) => {
  const user_id = req.user._id;
  const task_id = req.body.task_id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      task_id,
      { $push: { participants: user_id } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json({ message: "Successfully joined to the task" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//    LEAVE TASK
const leaveTask = async (req, res) => {
  const user_id = req.user._id;
  const task_id = req.params.task_id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: task_id },
      { $pull: { participants: user_id } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Successfully left the task", isLeaving: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const task_id = req.body.task_id;
  const status = req.body.status;

  try {
    if (status == "planning" || status == "inProgress" || status == "done") {
      const updatedTaskStatus = await Task.findByIdAndUpdate(
        task_id,
        { $set: { status: status } },
        { new: true }
      );

      if (!updatedTaskStatus) {
        return res.status(404).json({ error: "Task not found" });
      } else {
        res.status(200).json({ message: "Successfully updated task" });
      }
    } else {
      res.status(200).json({ error: "Bad status" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  DELETE TASK
const deleteTask = async (req, res) => {
  const task_id = req.body.task_id;

  try {
    const deletedTask = await Task.deleteOne({ _id: task_id });

    if (deletedTask.deletedCount === 1) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getAllListTasks,
  getTaskById,
  joinTask,
  leaveTask,
  deleteTask,
  updateTaskStatus,
  getUserTasks,
};
