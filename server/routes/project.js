const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//controllrs
const { createProject, getAllUserProjects, joinProject, leaveProject, deleteProject } = require('../controllers/projectController')

//middleware
router.use(requireAuth)

//search
router.post('/createProject', createProject)

router.delete('/deleteProject', deleteProject)

router.get('/getAllUserProjects', getAllUserProjects)

router.put('/joinProject', joinProject)

router.put('/leaveProject', leaveProject)

module.exports = router