const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

//controllrs
const {
  createTask,
  getAllProjectTasks,
  getTaskById,
  joinTask,
  leaveTask,
  deleteTask,
  updateTaskStatus,
  getUserTasks
} = require("../controllers/taskController");

//middleware
router.use(requireAuth);

//search
router.post("/createTask", createTask);

router.delete("/deleteTask", deleteTask);

router.get("/getAllProjectTasks/:project_id", getAllProjectTasks);

router.get("/getTaskById/:task_id", getTaskById);

router.get("/getUserTasks", getUserTasks);

router.put("/joinTask", joinTask);

router.put("/leaveTask/:task_id", leaveTask);

router.put("/updateTaskStatus", updateTaskStatus);

module.exports = router;
