const Task = require('../models/taskModel')

const getAllTasks = async(req, res) => {
    const user_id = req.user._id

    const tasks = await Taskfind({user_id})

    res.status(200).json(tasks)
}

const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const user_id = req.user._id

        const task = await Task.cerate(user_id, title, description, status);

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};