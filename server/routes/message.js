const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//controllrs
const { sendMessage } = require('../controllers/messageController')

//middleware
router.use(requireAuth)

//search
router.post('/sendMessage', sendMessage)

module.exports = router

