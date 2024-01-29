const List = require("../models/listModel");
const Board = require("../models/boardModel");
const Task = require("../models/taskModel");

const createList = async (req, res) => {
  const title = req.body.title;
  const board_id = req.query.board_id;

  try {
    const data = await List.create({ title });

    await Board.findByIdAndUpdate(
      board_id,
      { $push: { lists: data._id } },
      { new: true }
    );

    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getLists = async (req, res) => {
  const board_id = req.query.board_id;
  try {
    const board = await Board.findById(board_id).populate("lists");

    const data = board.lists;

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteList = async (req, res) => {
  const list_id = req.query.list_id;

  try {
    const deletedList = await List.findByIdAndRemove(list_id);

    const tasksToDelete = deletedList.tasks;

    await Task.deleteMany({ _id: { $in: tasksToDelete } });

    await Board.findByIdAndUpdate(
      deletedList.board_id,
      { $pull: { lists: list_id } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "List and associated tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editTitle = async (req, res) => {
  const list_id = req.query.list_id;
  const newTitle = req.body.title;

  try {
    const updatedList = await List.findByIdAndUpdate(
      list_id,
      { title: newTitle },
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ error: "List not found" });
    }

    res.status(200).json({ updatedList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createList, getLists, deleteList, editTitle };
