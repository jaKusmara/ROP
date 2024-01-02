const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

// controllers
const { addFriend, allUserFriends } = require("../controllers/friendController")

//middleware
router.use(requireAuth)

router.get("/allUserFriends", allUserFriends)

router.put("/addFriend", addFriend)

module.exports = router