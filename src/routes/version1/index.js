const express = require('express') 
const router = express.Router() 
const trelloRouter = require('./trelloRoutes') 
const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
router.use('/trello',trelloRouter)

router.use('/auth',authRoutes)
router.use('/user',userRoutes)
module.exports = router