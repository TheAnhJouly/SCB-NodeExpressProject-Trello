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
router.get('/', trelloController.getAllBoard)
router.post('/',validateBoardCreate,VerifyToken,trelloController.createBoard)
router.put('/updateBoard',validateBoardUpdate,VerifyToken,trelloController.updateBoard)
router.delete('/deleteBoard',validateBoardDelete,trelloController.deleteBoard)

//list  

router.get('/getList', VerifyToken,trelloControllerList.getAllList)
router.post('/createList',validateListCreate,VerifyToken,trelloControllerList.createList)
router.put('/updateList',validateListUpdate,VerifyToken,trelloControllerList.updateList) 
router.delete('/deleteList',validateListDelete,VerifyToken,trelloControllerList.deleteList)

//card
router.get('/getCard',VerifyToken,trelloControllerCard.getAllCard)
router.post('/createCard',validateCardCreate,VerifyToken,trelloControllerCard.createCard)
router.put('/updateCard',validateCardUpdate,VerifyToken,trelloControllerCard.updateCard) 
router.delete('/deleteCard',validateCardDelete,VerifyToken,trelloControllerCard.deleteCard)


module.exports = router 
