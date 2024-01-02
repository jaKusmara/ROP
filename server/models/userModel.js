const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    notifications:[
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ]
},{
    timestamps: true,
  });

//static signup method
userSchema.statics.signup = async function(firstname, surname, email, username, password, reTypePassword) {
    // Validation
    if (!email || !username || !password || !firstname || !surname || !reTypePassword) {
        throw Error('All fields must be filled!');
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    if (password !== reTypePassword) {
        throw Error("Passwords do not match");
    } 

    const emailExist = await this.findOne({ email });

    if (emailExist) {
        throw Error('Email already in use');
    }

    const usernameExist = await this.findOne({ username });

    if (usernameExist) {
        throw Error('Username already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ firstname, surname, email, username, password: hash});

    return user;
};


//static login method
userSchema.statics.login = async function(identifier, password) {
    if (!identifier || !password) {
        throw Error('All fields must be filled!');
    }

    const user = await this.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
        throw Error('Incorrect email or username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw Error('Incorrect password');
    }

    return user;
};


module.exports = mongoose.model('User', userSchema)