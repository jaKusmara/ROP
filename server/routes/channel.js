const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//controllrs
const { createChannel, getAllProjectChannels, useChannel, deleteChannel } = require('../controllers/channelController')

//middleware
router.use(requireAuth)


router.post('/createChannel', createChannel)

router.delete('/deleteChannel', deleteChannel)

router.get('/getAllProjectChannels', getAllProjectChannels)

router.put('/useChannel', useChannel)



module.exports = router