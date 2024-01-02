const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

const {createList, getLists} = require("../controllers/listController")

//middleware
router.use(requireAuth)

router.post("/createList", createList)

router.get('/getLists', getLists)

router.delete("/deleteList")

router.put("/updateList")

module.exports = router