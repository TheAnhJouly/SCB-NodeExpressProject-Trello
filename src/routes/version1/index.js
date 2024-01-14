const express = require('express') 
const router = express.Router() 
const trelloRouter = require('./trelloRoutes') 
const authRoutes = require('./authRoutes')

router.use('/trello',trelloRouter)

router.use('/auth',authRoutes)

module.exports = router