const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const projectSchema = new Schema({
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
},{
    timestamps: true,
  });

module.exports = mongoose.model('Project', projectSchema)