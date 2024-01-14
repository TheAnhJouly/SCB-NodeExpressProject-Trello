//Mục tiêu: Tạo kết nối đến mongo Cloud  (database)

const mongoose = require('mongoose');

async function connect() { 
    try {
        await mongoose.connect(
            'mongodb+srv://contactmng:3UMBrQTIFP5eGH3L@cluster0.jbf0uto.mongodb.net/scb-api?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('Database - Connect successfully !!!');
    } catch (error) {
        console.log('Database - Connect failure!!!');
    }
}

module.exports = {connect};