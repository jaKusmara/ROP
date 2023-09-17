const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//signup static method
userSchema.static.signup = async (email, password) => {
    const exist = await this.findOne({ email })

    if(exist){
        throw Error('Email sa uz pouziva')
    }


}

module.exports = mongoose.model('User', userSchema)