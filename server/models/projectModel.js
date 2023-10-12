const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    members: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            role: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role',
                required: true
            }
        }
    ],
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
        required: false
    },
    connectionString:{
        type: String,
        required: true,
        unique: true
    },
    channels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel'
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
},{
    timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema)
