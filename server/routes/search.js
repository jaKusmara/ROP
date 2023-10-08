const express = require('express');
const router = express.Router();

//controllrs
const search = require('../controllers/searchController')

//search
router.get('/', search)

module.exports = router