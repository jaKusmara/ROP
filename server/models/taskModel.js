const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    project_id:{
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
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    ],
})

module.exports = mongoose.model('Task', taskSchema)