const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: {type:String,required: true},
    password:{type: String,required: true},
    admin: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const loginAccount = mongoose.model("loginAccount",loginSchema);

module.exports = loginAccount;