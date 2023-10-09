const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
        required: false
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
},{
    timestamps: true,
  });

module.exports = mongoose.model('Project', projectSchema)