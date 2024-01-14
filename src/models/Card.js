// models/Card.js

const mongoose = require('mongoose'); 

const cardSchema = new mongoose.Schema({
  cardName: { type: String, required: true },
  desCard : { type: String },
  dueDate: { type: String },
  avatar: {
    originalname : String,
    Buffer: Buffer
  },
  cardMember: {type :String}
},{timestamps: true});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;