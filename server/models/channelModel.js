const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const channelSchema = new Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    title: { 
        type: String, 
        required: true 
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Channel', channelSchema)
