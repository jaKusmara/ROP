const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

const { newNotify, getAllNotifications } = require("../controllers/notificationsController")

//middleware
router.use(requireAuth)

router.post('/newNotification', newNotify)

router.get("/getAllNotifications", getAllNotifications)

module.exports = router