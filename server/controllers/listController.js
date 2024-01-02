const List = require("../models/listModel");
const Board = require("../models/boardModel");

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
    let listsAndTasks = [];

    const data = await Board.findById(board_id).populate("lists");

    const listPromises = data.lists.map(async (list) => {
      const listWithTasks = await List.findById(list._id).populate("tasks_id");
      return listWithTasks;
    });

    listsAndTasks = await Promise.all(listPromises);

    res.status(200).json({listsAndTasks})
  } catch (error) {
    res.status(404).json({ error });
  }
};

module.exports = { createList, getLists };
