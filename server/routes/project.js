const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

//controllrs
const {
  createProject,
  getAllUserProjects,
  getProjectById,
  joinProject,
  leaveProject,
  deleteProject,
  getAllProjectChannels,
  editProjectTitle,
  editProjectDescription,
} = require("../controllers/projectController");

//middleware
router.use(requireAuth);

//search
router.post("/createProject", createProject);

router.delete("/deleteProject", deleteProject);

router.get("/getAllUserProjects", getAllUserProjects);

router.get("/getAllProjectChannels", getAllProjectChannels);

router.get("/getProjectById", getProjectById);

router.put("/joinProject", joinProject);

router.put("/editProjectTitle", editProjectTitle);

router.put("/editProjectDescription", editProjectDescription);

router.put("/leaveProject", leaveProject);

module.exports = router;
