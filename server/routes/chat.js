const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//controllrs
const { useChat } = require('../controllers/chatController')

//middleware
router.use(requireAuth)

//search
router.post('/useChat', useChat)

module.exports = router