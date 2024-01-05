const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

//controllrs
const {
  createTask,
  getAllListTasks,
  getTaskById,
  joinTask,
  leaveTask,
  deleteTask,
  updateTask,
  getUserTasks
} = require("../controllers/taskController");

//middleware
router.use(requireAuth);

//search
router.post("/createTask", createTask);

router.delete("/deleteTask", deleteTask);

router.get("/getAllListTasks", getAllListTasks);

router.get("/getTaskById", getTaskById);

router.get("/getUserTasks", getUserTasks);

router.put("/joinTask", joinTask);

router.put("/leaveTask/:task_id", leaveTask);

router.put("/updateTask", updateTask);

module.exports = router;
