const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    test: String,
    age: Number,
    name: String,
})

const UserModel = mongoose.model("UserModel", userSchema)

module.exports = UserModel