const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//controllrs
const { createProject, getAllProjects } = require('../controllers/projectController')

//middleware
router.use(requireAuth)

//search
router.post('/createProject', createProject)

router.get('/getAllProjects', getAllProjects)

module.exports = router