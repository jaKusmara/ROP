const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)