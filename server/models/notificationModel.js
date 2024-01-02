const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    sender_id:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    receiver_id:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    notification:
        {
            type: {
                type: String,
                required: true
            },
            body: {
                type: String,
                required: true
            }
        }
},{
    timestamps: true,
});

module.exports = mongoose.model('Notify', notificationSchema)
