const User = require('../models/userModel')

//login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

//singup user
const singUpUser = async (req, res) => {
    res.json({mssg: 'signun user'})
}

module.exports = { loginUser, singUpUser }