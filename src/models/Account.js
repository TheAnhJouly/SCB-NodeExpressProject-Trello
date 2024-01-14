const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: String, 
    password:String,
});

const loginAccount = mongoose.model("loginAccount",loginSchema);

module.exports = loginAccount;