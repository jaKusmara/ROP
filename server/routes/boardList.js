const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  createList,
  getLists,
  deleteList,
  editTitle,
} = require("../controllers/listController");

//middleware
router.use(requireAuth);

router.post("/createList", createList);

router.get("/getLists", getLists);

router.delete("/deleteList", deleteList);

router.put("/editTitle", editTitle);

module.exports = router;
