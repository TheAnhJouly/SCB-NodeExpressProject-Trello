// models/List.js

const mongoose = require('mongoose'); 

const listSchema = new mongoose.Schema({
  listName: { type: String, required: true },
  position: { type: Number},
  Cards : {type: Array } 
},{timestamps: true});

const List = mongoose.model('List', listSchema);

module.exports = List;