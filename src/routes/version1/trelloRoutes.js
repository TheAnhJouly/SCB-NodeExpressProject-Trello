const express = require('express')
const router = express.Router()
const trelloController = require('../../controllers/trelloController')
const trelloControllerList = require('../../controllers/trelloControllerList');
const trelloControllerCard = require('../../controllers/trelloControllerCard')
const VerifyToken = require('../../middlewares/VerifyToken');

//validate
//board
const validateBoardCreate = require('../../middlewares/Validation/Board/ValidateBoardCreate')
const validateBoardUpdate =   require('../../middlewares/Validation/Board/ValidateBoardUpdate')
const validateBoardDelete =  require('../../middlewares/Validation/Board/ValidateBoardDelete')

//list 
const validateListCreate = require('../../middlewares/Validation/List/ValidateListCreate')
const validateListUpdate = require('../../middlewares/Validation/List/validateListUpdate');
const validateListDelete = require('../../middlewares/Validation/List/validateListDelete');

//card
const validateCardCreate = require('../../middlewares/Validation/Card/validateCardCreate');
const validateCardUpdate = require('../../middlewares/Validation/Card/validateCardUpdate');
const validateCardDelete = require('../../middlewares/Validation/Card/validateCardDelete');


//router
//board
router.get('/', trelloController.getAllBoard) //checked
router.post('/',validateBoardCreate,VerifyToken,trelloController.createBoard)//checked
router.put('/updateBoard',validateBoardUpdate,VerifyToken,trelloController.updateBoard)//checked
router.delete('/deleteBoard',validateBoardDelete,VerifyToken,trelloController.deleteBoard)//checked

//list  

router.get('/getList', VerifyToken,trelloControllerList.getAllList)//checked
router.post('/createList',validateListCreate,VerifyToken,trelloControllerList.createList)//checked
router.put('/updateList',validateListUpdate,VerifyToken,trelloControllerList.updateList) //checked
router.delete('/deleteList',validateListDelete,VerifyToken,trelloControllerList.deleteList) //checked

//card
router.get('/getCard',VerifyToken,trelloControllerCard.getAllCard)//checked
router.post('/createCard',validateCardCreate,VerifyToken,trelloControllerCard.createCard)//checked
router.put('/updateCard',validateCardUpdate,VerifyToken,trelloControllerCard.updateCard) //checked
router.delete('/deleteCard',validateCardDelete,VerifyToken,trelloControllerCard.deleteCard) //checked


module.exports = router 
