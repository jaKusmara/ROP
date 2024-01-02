const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

//controllrs
const {
  createChannel,
  getChannel,
  deleteChannel,
} = require("../controllers/channelController");

//middleware
router.use(requireAuth);

router.post("/createChannel", createChannel);

router.delete("/deleteChannel", deleteChannel);

router.get("/getChannel", getChannel);

module.exports = router;
