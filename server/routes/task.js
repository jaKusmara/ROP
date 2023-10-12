const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//controllrs
const { createTask, getAllTasks, getTaskById, joinTask, leaveTask, deleteTask, updateTaskStatus } = require('../controllers/taskController')

//middleware
router.use(requireAuth)

//search
router.post('/createTask', createTask)

router.delete('/deleteTask', deleteTask)

router.get('/getAllTasks', getAllTasks)

router.get('/getTaskById', getTaskById)

router.put('/joinTask', joinTask)

router.put('/leaveTask', leaveTask)

router.put('/updateTaskStatus', updateTaskStatus)

module.exports = router