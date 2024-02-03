const express = require('express')
const authController = require('../../controllers/authController')
const router = express.Router()

const VerifyAdmin = require('../../middlewares/VerifyAdmin');

const validateUserUpdate = require('../../middlewares/Validation/User/validateUserUpdate')
const validateUserDelete = require('../../middlewares/Validation/User/validateUserDelete')
 
router.get('/getUsers', authController.getUser) //checked
router.put('/updateUser',validateUserUpdate,authController.updateUser) //checked
router.delete('/deleteUser',validateUserDelete,VerifyAdmin.verifyTokenAndAdminAuth ,authController.deleteUser) //checked

module.exports = router;