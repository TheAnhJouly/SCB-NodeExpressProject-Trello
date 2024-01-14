const express = require('express')
var bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const port = 5000;
const multer = require('multer')

const API_TRELLO = require('./routes/version1'); 
const errorHandle = require('./middlewares/errorHandle');
const db = require('./configs/mongodb');

db.connect()

app.get('/',(req,res)=> {
    res.send('<h3>Trello website</h3>')
})

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

const upload = multer();
app.use(upload.any())

app.use('/uploads',express.static('upload'))

//use để sử dụng router 
app.use('/version1',API_TRELLO)
app.use(errorHandle)


app.listen(port, ()=>{ 
    console.log(`Sever is running at http://localhost:${port}`)
})