const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const Role = require("../models/roleModel")

//middleware
router.use(requireAuth);

//search
router.put("/updateRole", async (req, res) => {
  const user_id = req.query.user_id;
  const project_id = req.query.project_id;

  try {
    const role = await Role.updateRole(role, project_id, user_id);

    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
