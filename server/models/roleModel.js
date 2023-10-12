const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    permision: [String]
})

module.exports = mongoose.model('Role', roleSchema)