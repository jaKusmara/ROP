const Task = require('../models/taskModel')
const Project = require('../models/projectModel')



//  CREATE TASK
const createTask = async (req, res) => {
    const { title, description, project_id } = req.body;
    const status = "planning";

    try {
        const task = await Task.create({ project_id, title, description, status });

        await Project.findByIdAndUpdate(
            project_id,
            { $push: { tasks: task._id } },
            { new: true }
        );

        if (task) {
            res.status(200).json({ message: 'Task created successfully', task });
        } else {
            res.status(400).json({ error: 'Task creation failed' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//  GET PROJECT's TASKS
const getAllProjectTasks = async (req, res) => {
    const project_id = req.params.project_id;
  
    try {
      const tasks = await Task.find({ project_id });
  
      res.status(200).json({ message: 'Task created successfully', task });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
//  GET TASK BY ID
const getTaskById = async (req, res) => {
    const task_id = req.body.task_id;

    try {
        const task = await Task.findById(task_id);

        if (!task) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(200).json(task);
        }
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
            return res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(200).json({ message: 'Successfully joined to the task' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const leaveTask = async(req, res) => {
    const user_id = req.user._id
    const task_id = req.body.task_id

    try{
        const updatedTask = await Task.findByIdAndUpdate(
            task_id,
            { $pull :{ participants: user_id} },
            { new: true }
        )
            
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.status(200).json({ message: 'Successfully left to the task' });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

const updateTaskStatus = async (req, res) => {
    const task_id = req.body.task_id
    const status = req.body.status

    try{
        if(status == 'planning' || status == 'inProgress' || status == 'done'){
            const updatedTaskStatus = await Task.findByIdAndUpdate(
                task_id,
                { $set: {status:status}},
                { new: true }
            )

            if (!updatedTaskStatus) {
                return res.status(404).json({ error: 'Task not found' });
            } else {
                res.status(200).json({ message: 'Successfully updated task' });
            }
        }else{
            res.status(200).json({ error: 'Bad status' });
        }

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

//  DELETE TASK
const deleteTask = async (req, res) => {
    const task_id = req.body.task_id;

    try {
        const deletedTask = await Task.deleteOne(
            { _id: task_id }
            );

        if (deletedTask.deletedCount === 1) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createTask, getAllProjectTasks, getTaskById, joinTask, leaveTask, deleteTask, updateTaskStatus }