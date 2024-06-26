const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

//controllrs
const {
  createTask,
  getAllBoardTasks,
  getTaskById,
  joinTask,
  leaveTask,
  deleteTask,
  updateTask,
  getUserTasks,
  taskParticipants,
  moveTask,
  addLabel,
  deleteLabel,
} = require("../controllers/taskController");

//middleware
router.use(requireAuth);

//search
router.post("/createTask", createTask);

router.delete("/deleteTask", deleteTask);

router.get("/getAllBoardTasks", getAllBoardTasks);

router.get("/getTaskById", getTaskById);

router.get("/taskParticipants", taskParticipants);

router.get("/getUserTasks", getUserTasks);

router.put("/joinTask", joinTask);

router.put("/leaveTask", leaveTask);

router.put("/updateTask", updateTask);

router.put("/moveTask", moveTask);

router.put("/addLabel", addLabel);

router.put("/deleteLabel", deleteLabel);

module.exports = router;
