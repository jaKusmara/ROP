const express = require('express');
const router = express.Router();

//controllrs
const { loginUser, signupUser } = require('../controllers/userController')

//login
router.post('/signin', loginUser)

//sing up
router.post('/signup', signupUser)

module.exports = router