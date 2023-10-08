const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//controllrs
const search = require('../controllers/searchController')

//middleware
router.use(requireAuth)

//search
router.get('/', search)

module.exports = router