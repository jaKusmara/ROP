const express = require('express');
const router = express.Router();

//controllrs
const { loginUser, singupUser } = require('../controllers/useController')

//login
router.post('/login', loginUser)

//sing up
router.post('/signup', singupUser)

module.exports = router