const express = require('express');
const router = express.Router();

//controllrs
const { loginUser, singUpUser } = require('../controllers/useController')

//login
router.post('/login', loginUser)

//sing up
router.post('/singup', singUpUser)

module.exports = router