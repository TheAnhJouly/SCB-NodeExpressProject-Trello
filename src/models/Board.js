// models/Board.js

const mongoose = require('mongoose'); 

const boardSchema = new mongoose.Schema({
  boardName: { type: String, required: true },
  desBoard: { type: String, required: true },
  lists : Array,
  avatar: {
    originalname : String,
    Buffer: Buffer
  },
},{timestamps: true});
 

const Board = mongoose.model('Board', boardSchema);

module.exports = Board; 