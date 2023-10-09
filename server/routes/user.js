const express = require('express');
const router = express.Router();

//controllrs
const { loginUser, signupUser } = require('../controllers/userController')

//login
router.post('/login', loginUser)

//sing up
router.post('/signup', signupUser)

module.exports = router