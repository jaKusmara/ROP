const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//controllrs
const { createTask, getAllProjectTasks, getTaskById, joinTask, leaveTask, deleteTask, updateTaskStatus } = require('../controllers/taskController')

//middleware
router.use(requireAuth)

//search
router.post('/createTask', createTask)

router.delete('/deleteTask', deleteTask)

router.get('/getAllProjectTasks', getAllProjectTasks)

router.get('/getTaskById', getTaskById)

router.put('/joinTask', joinTask)

router.put('/leaveTask', leaveTask)

router.put('/updateTaskStatus', updateTaskStatus)

module.exports = router