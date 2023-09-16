const express = require('express');
const router = express.Router();

const UserModel = require('../models/userSchema')

const getUsers = async (req, res, next) => {
    let user
    try {
        user = await UserModel.findById(req.params.id)

        if(user === null){
            return res.status(404).json({message: "Uzivatel sa nenasiel sa nenasiel"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}

//get all
router.get('/', async (req, res) => {
    try {
        const user = await user.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//create
router.post('/', async (req, res) => {
    const user = new userModel({
       test: req.body.test,
       age: req.body.age,
       name: req.body.name
    })

    try {
       const newUser = await UserModel.save()
       res.status(201).json(newUser)
    } catch (err) {
       res.status(400).json({message: err.message})
    }
})

module.exports = router