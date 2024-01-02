const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//controllrs
const { sendMessage, getAllMessages } = require('../controllers/messageController')

//middleware
router.use(requireAuth)

//search
router.post('/sendMessage', sendMessage)

router.get('/getAllMessages', getAllMessages)

module.exports = router

