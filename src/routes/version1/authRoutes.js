const express = require('express')
const authController = require('../../controllers/authController')
const router = express.Router()

const validateUserCreate = require('../../middlewares/Validation/User/ValidateUserCreate')
 
//username + password
router.post('/login', authController.login) //checked

router.post('/register',validateUserCreate, authController.register) //checked

module.exports = router;